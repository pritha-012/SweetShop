const express = require('express');
const router = express.Router();
const Sweet = require('../models/sweets');
const { jwtAuthMiddleware } = require('../jwt');
const User = require('../models/user');

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }
    next();
};


router.post('/', jwtAuthMiddleware, isAdmin, async (req, res) => {
    try {
        const { name, category, price, quantity, description, image } = req.body;

        if (!name || !category || price === undefined || quantity === undefined) {
            return res.status(400).json({ error: 'Name, category, price, and quantity are required' });
        }

        if (price < 0 || quantity < 0) {
            return res.status(400).json({ error: 'Price and quantity cannot be negative' });
        }

        const existingSweet = await Sweet.findOne({ name });
        if (existingSweet) {
            return res.status(400).json({ error: 'Sweet with this name already exists' });
        }

        const newSweet = new Sweet({ name, category, price, quantity, description, image });
        const savedSweet = await newSweet.save();
        
        res.status(201).json({ 
            message: 'Sweet added successfully', 
            sweet: savedSweet 
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/', async (req, res) => {
    try {
        const sweets = await Sweet.find();
        res.json(sweets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/search', async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;
        const query = {};

        if (name) query.name = { $regex: name, $options: 'i' };
        if (category) query.category = { $regex: category, $options: 'i' };
        if (minPrice || maxPrice)
            query.price = {
                ...(minPrice && { $gte: Number(minPrice) }),
                ...(maxPrice && { $lte: Number(maxPrice) })
            };

        const sweets = await Sweet.find(query);
        res.json(sweets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/:id/purchase', jwtAuthMiddleware, async (req, res) => {
    try {
        const sweet = await Sweet.findById(req.params.id);
        if (!sweet) return res.status(404).json({ error: 'Sweet not found' });

        if (sweet.quantity <= 0) {
            return res.status(400).json({ error: 'Out of stock' });
        }

        sweet.quantity -= 1;
        await sweet.save();

        res.json({ message: `You purchased ${sweet.name}`, remaining: sweet.quantity });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.put('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: Admins only' });
        }

        const updatedSweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSweet) return res.status(404).json({ error: 'Sweet not found' });

        res.json({ message: 'Sweet updated successfully', sweet: updatedSweet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: Admins only' });
        }

        const deleted = await Sweet.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Sweet not found' });

        res.json({ message: 'Sweet deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/:id/restock', jwtAuthMiddleware, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Access denied: Admins only' });
        }

        const { amount } = req.body;
        const sweet = await Sweet.findById(req.params.id);
        if (!sweet) return res.status(404).json({ error: 'Sweet not found' });

        sweet.quantity += Number(amount || 0);
        await sweet.save();

        res.json({ message: `Restocked ${sweet.name}`, newQuantity: sweet.quantity });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
