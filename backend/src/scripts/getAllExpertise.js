const connectDB = require('../config/db');
const mongoose = require('mongoose');
const Expertise = require('../models/expertiseModel');

async function getAllExpertise() {
  try {
    // Connect to the database
    await connectDB();
    
    // Retrieve all roles
    const expertise = await Expertise.find({});
    console.log('All roles:', expertise);
  } catch (error) {
    console.error('Error retrieving expertise:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

getAllExpertise();
