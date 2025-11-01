const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

router.post('/signup', async (req, res) => {
    try {
        const { name, email, mobile, password, role } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }


       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

       
        if (role === 'admin') {
            const adminUser = await User.findOne({ role: 'admin' });
            if (adminUser) {
                return res.status(400).json({ error: 'Admin user already exists' });
            }
        }

        const newUser = new User({ name, email, mobile, password, role });
        const savedUser = await newUser.save();

        const payload = { id: savedUser._id, role: savedUser.role };
        const token = generateToken(payload);

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: savedUser._id, 
                    name: savedUser.name, 
                    email: savedUser.email, 
                    role: savedUser.role 
                },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const payload = { id: user._id, role: user.role };
        const token = generateToken(payload);

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id,
                    name: user.name, 
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role 
                }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Both current and new passwords are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
