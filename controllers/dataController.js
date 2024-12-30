const Data = require('../models/dataModel');
const User = require('../models/userModel');

const getAllUploads = async (req, res) => {
    try {
        // Fetch all uploaded data and populate the uploadedBy field with user details
        const uploads = await Data.find()
            .populate('uploadedBy', 'firstName lastName email') // Fetch specific fields from User
            .select('-__v'); // Exclude the version key if not needed

        res.status(200).json({
            message: 'Uploads retrieved successfully!',
            data: uploads,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching uploads', error: error.message });
    }
};


//Upload s API Endpoints

const uploadData = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded or invalid file type/size.' });
        }

        // Save file details to the database
        const { title,uploadedBy } = req.body;
        const videoPath = req.file.path;

        const newData = new Data({
            video: videoPath,
            title,
            uploadedBy
            
        });

        await newData.save();

        res.status(201).json({ message: 'Video uploaded successfully!', data: newData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = { uploadData , getAllUploads};
