const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const seedCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if categories already exist
        const existingCategories = await Category.find();
        
        if (existingCategories.length >= 10) {
            console.log('Categories already exist!');
            console.log(`Total categories: ${existingCategories.length}`);
            process.exit(0);
        }

        // Create main categories and subcategories
        const categories = [
            // Main Ashta Dhatu Category
            {
                name: 'Ashtadhatu Jewellery',
                slug: 'ashtadhatu-jewellery',
                description: 'Unveil the Sacred',
                productType: 'ashta-dhatu',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            // Ashta Dhatu Subcategories
            {
                name: 'Necklace',
                slug: 'necklace',
                description: 'Elegant Ashta Dhatu Necklaces',
                productType: 'ashta-dhatu',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Earrings',
                slug: 'earrings',
                description: 'Beautiful Ashta Dhatu Earrings',
                productType: 'ashta-dhatu',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Rings',
                slug: 'rings',
                description: 'Sacred Ashta Dhatu Rings',
                productType: 'ashta-dhatu',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Mangal Sutra',
                slug: 'mangal-sutra',
                description: 'Traditional Ashta Dhatu Mangal Sutra',
                productType: 'ashta-dhatu',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Mens',
                slug: 'mens',
                description: 'Ashta Dhatu Jewelry for Men',
                productType: 'ashta-dhatu',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            // Main Fashion Jewelry Category
            {
                name: 'Fashion Jewellery',
                slug: 'fashion-jewellery',
                description: 'Define Your Style',
                productType: 'fashion-jewelry',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            // Fashion Jewelry Subcategories
            {
                name: 'Necklace',
                slug: 'necklace',
                description: 'Trendy Fashion Necklaces',
                productType: 'fashion-jewelry',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Earrings',
                slug: 'earrings',
                description: 'Stylish Fashion Earrings',
                productType: 'fashion-jewelry',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Rings',
                slug: 'rings',
                description: 'Modern Fashion Rings',
                productType: 'fashion-jewelry',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Mangal Sutra',
                slug: 'mangal-sutra',
                description: 'Contemporary Mangal Sutra',
                productType: 'fashion-jewelry',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            },
            {
                name: 'Mens',
                slug: 'mens',
                description: 'Fashion Jewelry for Men',
                productType: 'fashion-jewelry',
                parent: null,
                level: 0,
                image: 'category-placeholder.jpg'
            }
        ];

        // Insert categories
        const createdCategories = await Category.insertMany(categories);
        
        console.log('\n✓ Categories created successfully!');
        console.log('\nAshta Dhatu Categories:');
        createdCategories
            .filter(cat => cat.productType === 'ashta-dhatu')
            .forEach(cat => {
                console.log(`  - ${cat.name}`);
            });
        
        console.log('\nFashion Jewelry Categories:');
        createdCategories
            .filter(cat => cat.productType === 'fashion-jewelry')
            .forEach(cat => {
                console.log(`  - ${cat.name}`);
            });

        console.log('\n✓ Category seeding complete!');
        console.log('\nYou can now:');
        console.log('  1. View categories on homepage');
        console.log('  2. Customize them in Admin Panel');
        console.log('  3. Upload custom images');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
};

seedCategories();
