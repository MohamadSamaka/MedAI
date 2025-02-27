const Expertise = require("../models/expertiseModel");

async function seedExpertise() {
  try {
    console.log("Seeding Expertise...");
    // Clear existing expertise entries
    await Expertise.deleteMany({});
    console.log("✅ Existing expertise entries cleared.");

    // Sample expertise data
    const expertiseData = [
      { name: "Cardiology", description: "Expertise in heart and vascular system." },
      { name: "Neurology", description: "Expertise in brain and nervous system." },
      { name: "Orthopedics", description: "Expertise in bones and joints." },
      { name: "Dermatology", description: "Expertise in skin, hair, and nails." },
      { name: "Pediatrics", description: "Expertise in child healthcare." }
    ];

    await Expertise.insertMany(expertiseData);
    console.log("✅ Expertise data seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding expertise:", error);
    throw error;
  }
}

module.exports = seedExpertise;
