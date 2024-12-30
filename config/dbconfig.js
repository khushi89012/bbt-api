const mongoose = require('mongoose');

const connection_url = 'mongodb+srv://black:black@cluster0.menrwkh.mongodb.net/';
const dbName = 'bbt'; 

const connectDB = async () => {
    try {
        await mongoose.connect(`${connection_url}${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
