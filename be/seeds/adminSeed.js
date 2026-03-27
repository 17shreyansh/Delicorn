const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@delicorn.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email: admin@delicorn.com');
            console.log('Password: admin123');
            process.exit(0);
        }

        // Create new admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@delicorn.com',
            password: 'admin123',
            isAdmin: true,
            isEmailVerified: true,
            accountStatus: 'active'
        });

        console.log('✓ New admin user created successfully!');
        console.log('Email: admin@delicorn.com');
        console.log('Password: admin123');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

seedAdmin();