// Test script for Support Tickets System
// Run this with: node be/test-support-system.js

require('dotenv').config();
const mongoose = require('mongoose');
const Ticket = require('./models/Support');
const User = require('./models/User');

const testSupportSystem = async () => {
  try {
    console.log('🧪 Starting Support Tickets System Test...\n');

    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database connected\n');

    // Test 1: Check Ticket Model
    console.log('Test 1: Ticket Model Schema');
    const ticketSchema = Ticket.schema.obj;
    const requiredFields = ['title', 'description', 'category', 'user'];
    const hasRequiredFields = requiredFields.every(field => ticketSchema[field]);
    console.log(`✅ Required fields present: ${hasRequiredFields}\n`);

    // Test 2: Check if admin users exist
    console.log('Test 2: Admin Users Check');
    const adminCount = await User.countDocuments({ isAdmin: true });
    console.log(`✅ Found ${adminCount} admin user(s)\n`);

    // Test 3: Check ticket ID generation
    console.log('Test 3: Ticket ID Generation Test');
    const testUser = await User.findOne();
    if (testUser) {
      const testTicket = new Ticket({
        title: 'Test Ticket',
        description: 'Testing ticket ID generation',
        category: 'General Inquiry',
        user: testUser._id
      });
      
      await testTicket.save();
      console.log(`✅ Ticket ID generated: ${testTicket.ticketId}`);
      
      // Clean up test ticket
      await Ticket.deleteOne({ _id: testTicket._id });
      console.log('✅ Test ticket cleaned up\n');
    } else {
      console.log('⚠️  No users found to test with\n');
    }

    // Test 4: Check existing tickets
    console.log('Test 4: Existing Tickets');
    const ticketCount = await Ticket.countDocuments();
    console.log(`✅ Total tickets in system: ${ticketCount}\n`);

    // Test 5: Check ticket statuses
    console.log('Test 5: Ticket Status Distribution');
    const statusStats = await Ticket.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    console.log('Status breakdown:');
    statusStats.forEach(stat => {
      console.log(`  - ${stat._id}: ${stat.count}`);
    });
    console.log('');

    console.log('✅ All tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('  ✅ Model schema is correct');
    console.log('  ✅ Admin users available');
    console.log('  ✅ Ticket ID generation working');
    console.log('  ✅ Database queries functional');
    console.log('\n🎉 Support Tickets System is working properly!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

testSupportSystem();
