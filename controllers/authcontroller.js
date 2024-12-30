const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');

const generatePassword = (firstName, lastName, number) => {
    const basePassword = `${firstName.slice(0, 2)}${lastName.slice(-2)}${number.slice(-4)}`;
    return basePassword;
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const signup = async (req, res) => {
    const { firstName, lastName, email, number } = req.body;

    if (!firstName || !lastName || !email || !number) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        const generatedPassword = generatePassword(firstName, lastName, number);

        const newUser = new User({
            firstName,
            lastName,
            email,
            number,
            password: generatedPassword,
        });

        await newUser.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Welcome to Our App',
            text: `Hello ${firstName} ${lastName},\n\nYour account has been created successfully.\nHere are your details:\nName: ${firstName} ${lastName}\nNumber: ${number}\nPassword: ${generatedPassword}\n\nThank you for joining us!`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error sending email.' });
            }
            res.status(201).json({ message: 'Signup successful! Check your email for credentials.' })
            .end()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' }).end();
    }
};

const login = async (req, res) => {
    
    const { firstName, password } = req.body;
    if (!firstName || !password) {
        return res.status(400).json({ message: 'First name and password are required.' });
    }
 

    try {
        const user = await User.findOne({ firstName });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isPasswordValid = user.password;
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful!',name:firstName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { signup, login };
