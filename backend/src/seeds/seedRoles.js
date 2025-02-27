const Role = require('../models/roleModel');

async function seedRoles() {
  try {
    console.log("Seeding Roles...");
    const defaultRoles = ['admin', 'user', 'doctor'];
    for (const roleName of defaultRoles) {
      const existingRole = await Role.findOne({ roleName });
      if (!existingRole) {
        await Role.create({ roleName });
        console.log(`✅ Role seeded: ${roleName}`);
      } else {
        console.log(`ℹ️  Role already exists: ${roleName}`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
    throw error;
  }
}

module.exports = seedRoles;
