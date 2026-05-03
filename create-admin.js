require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected.');
    
    const email = 'admin@vishal.com';
    const password = 'admin123';

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`\nAdmin user '${email}' already exists in the database!`);
      console.log(`If you forgot the password, delete the user from MongoDB Atlas and run this script again.`);
      process.exit(0);
    }

    // Create new user (the password will be hashed automatically by the User model's pre-save hook)
    await User.create({
      email,
      password
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('-----------------------------------');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('-----------------------------------');
    console.log('You can now log in to the frontend admin panel.');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Database connection error:', err);
    process.exit(1);
  });
