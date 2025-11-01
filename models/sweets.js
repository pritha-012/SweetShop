const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        
    },
    category: {
        type: String,
        required: true,
       
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: '' 
    }
}, { timestamps: true });


const Sweet = mongoose.model('Sweet', sweetSchema);
module.exports = Sweet;
