const connectDB = require("../config/db");
const Locations = require("../models/locationModel");

async function seedLocations() {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected.");

    await Locations.deleteMany({});
    console.log("Existing locations cleared.");

    const locationsData = [
      { locationName: "Tel Aviv" },
      { locationName: "Jerusalem" },
      { locationName: "Haifa" },
      { locationName: "Beersheba" },
      { locationName: "Eilat" },
      { locationName: "Netanya" },
      { locationName: "Ashdod" },
      { locationName: "Holon" },
      { locationName: "Rishon LeZion" }
    ];

    // Insert sample data into the collection
    await Locations.insertMany(locationsData);
    console.log("Locations seeded successfully.");
  } catch (error) {
    console.error("Error seeding locations:", error);
  }
}

module.exports = seedLocations;
