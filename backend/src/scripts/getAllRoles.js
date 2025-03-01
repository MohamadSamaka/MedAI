const connectDB = require('../config/db');
const mongoose = require('mongoose');
const Role = require('../models/roleModel');

async function getAllRoles() {
  try {
    // Connect to the database
    await connectDB();
    
    // Retrieve all roles
    const roles = await Role.find({});
  } catch (error) {
    console.error('Error retrieving roles:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

getAllRoles();
