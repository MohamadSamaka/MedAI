const MedicalRecord = require("../models/medicalRecordModel");
const User = require("../models/userModel");

async function seedMedicalRecords() {
  try {
    console.log("Seeding Medical Records...");
    const user = await User.findOne({ email: "admin@example.com" });
    if (!user) {
      console.warn("User not found. Please create a user first.");
      return;
    }

    const existingRecord = await MedicalRecord.findOne({ userId: user._id });
    if (!existingRecord) {
      const medicalRecord = new MedicalRecord({
        userId: user._id,
        // Optionally, add more default properties here.
      });
      await medicalRecord.save();
      console.log(`✅ Medical record seeded for user: ${user.email}`);
    } else {
      console.log(`ℹ️  Medical record already exists for user: ${user.email}`);
    }
  } catch (error) {
    console.error("❌ Error seeding medical records:", error);
    throw error;
  }
}

module.exports = seedMedicalRecords;
