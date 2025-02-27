const connectDB = require('../config/db');
const mongoose = require("mongoose");

const dropDatabase = async () => {
  await connectDB(); // Connect to the database

  try {
    await mongoose.connection.db.dropDatabase();
    console.log("Database dropped successfully.");
  } catch (err) {
    console.error("Error dropping database:", err);
    throw err; // propagate error to caller
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected after dropping the database.");
  }
};

module.exports = dropDatabase;
