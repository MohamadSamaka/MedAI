const connectDB = require('../config/db');
const mongoose = require('mongoose');
const Location = require('../models/locationModel');

async function getAllRoles() {
  try {
    // Connect to the database
    await connectDB();
    
    // Retrieve all roles
    const locations = await Location.find({});
    console.log('All roles:', locations);
  } catch (error) {
    console.error('Error retrieving roles:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

getAllRoles();
