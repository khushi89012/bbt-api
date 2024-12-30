const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    video: { type: String, required: true },
    title: { type: String, required: true },
    uploadedBy: { 
        type: String, // Store `firstName` as a string
        required: true 
    },
    uploadedAt: { 
        type: Date, 
        default: Date.now // Automatically store the upload time
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
