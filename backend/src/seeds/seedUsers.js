const mongoose = require("mongoose");
const User = require("../models/userModel");
const Expertise = require("../models/expertiseModel");
const Location = require("../models/locationModel");
const Role = require("../models/roleModel");
const Doctor = require("../models/doctorModel");
const ChatLog = require("../models/chatLogModel");

/**
 * Creates an empty ChatLog for a given user if one doesn't exist.
 * @param {mongoose.Document} user - The user document.
 */
async function createEmptyChatLog(user) {
  // Check if a ChatLog already exists for the user
  const existingLog = await ChatLog.findOne({ user_id: user._id });
  if (!existingLog) {
    await ChatLog.create({
      user_id: user._id,
      chat_session: [], // empty session array
    });
    console.log(`✅ Empty ChatLog created for user: ${user.email}`);
  } else {
    console.log(`ℹ️  ChatLog already exists for user: ${user.email}`);
  }
}

async function seedUsers() {
  try {
    console.log("Seeding Users...");

    // Fetch required roles
    const adminRole = await Role.findOne({ roleName: "admin" });
    const userRole = await Role.findOne({ roleName: "user" });
    const doctorRole = await Role.findOne({ roleName: "doctor" });

    if (!adminRole || !userRole || !doctorRole) {
      console.warn("One or more roles not found. Please run seedRoles first.");
      return;
    }

    // ----- Seed Admin User -----
    const adminEmail = "admin@example.com";
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      const hashedPassword = "AdminPass123";
      adminUser = await User.create({
        Fname: "Admin",
        Lname: "Admin",
        idPerson: "123456789",
        phone: "1234567891234",
        email: adminEmail,
        password: hashedPassword,
        roleId: adminRole._id,
        DateOfBirth: new Date("1990-05-20"),
        address: "1234 Maple Street, Springfield, USA",
      });
      console.log(`✅ Admin seeded: ${adminEmail}`);
      await createEmptyChatLog(adminUser);
    } else {
      console.log(`ℹ️  Admin already exists: ${adminEmail}`);
    }

    // ----- Seed Normal Users -----
    const normalUsers = [
      {
        Fname: "Jane",
        Lname: "Doe",
        idPerson: "22334455",
        phone: "2233445566778",
        email: "jane.doe@example.com",
        password: "UserPass123",
        DateOfBirth: new Date("1985-02-15"),
        address: "5678 Elm St, Townsville",
        roleId: userRole._id,
      },
      {
        Fname: "Mike",
        Lname: "Ross",
        idPerson: "33445566",
        phone: "3344556677889",
        email: "mike.ross@example.com",
        password: "UserPass123",
        DateOfBirth: new Date("1987-03-20"),
        address: "789 Pine St, Villagetown",
        roleId: userRole._id,
      },
    ];

    for (const userData of normalUsers) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create(userData);
        console.log(`✅ Normal user seeded: ${userData.email}`);
        await createEmptyChatLog(user);
      } else {
        console.log(`ℹ️  Normal user already exists: ${userData.email}`);
      }
    }

    // ----- Seed Doctor Users -----
    // First, fetch a random Expertise document and a random Location document from the DB.
    // You can fetch multiple random items if you want variety among doctors;
    // here, for simplicity, we fetch just one random Expertise and one random Location,
    // and use them for all doctors.
    const [randomExpertise] = await Expertise.aggregate([{ $sample: { size: 1 } }]);
    const [randomLocation] = await Location.aggregate([{ $sample: { size: 1 } }]);

    if (!randomExpertise || !randomLocation) {
      console.warn("No Expertise or Location found in the database. Please seed them first.");
      return;
    }

    const doctors = [
      {
        user: {
          Fname: "John",
          Lname: "Doe",
          idPerson: "93233311",
          phone: "9234567890123",
          email: "john.doe321@example.com",
          password: "secret123",
          DateOfBirth: new Date("1990-01-01"),
          address: "123 Main St, Cityville",
          roleId: doctorRole._id,
        },
        doctorDetails: {
          expertise: randomExpertise._id,
          location: randomLocation._id,
          workingTime: [
            { day: "Monday", start_time: "09:00", end_time: "17:00" },
            { day: "Wednesday", start_time: "10:00", end_time: "18:00" },
          ],
        },
      },
      {
        user: {
          Fname: "Alice",
          Lname: "Smith",
          idPerson: "987654321",
          phone: "9876543211234",
          email: "alice.smith@example.com",
          password: "DoctorPass123",
          DateOfBirth: new Date("1980-10-10"),
          address: "321 Oak St, Cityplace",
          roleId: doctorRole._id,
        },
        doctorDetails: {
          expertise: randomExpertise._id,
          location: randomLocation._id,
          workingTime: [
            { day: "Monday", start_time: "08:00", end_time: "16:00" },
            { day: "Tuesday", start_time: "09:00", end_time: "17:00" },
          ],
        },
      },
      {
        user: {
          Fname: "Bob",
          Lname: "Johnson",
          idPerson: "111222333",
          phone: "1112223334444",
          email: "bob.johnson@example.com",
          password: "DoctorPass123",
          DateOfBirth: new Date("1978-07-07"),
          address: "654 Cedar Ave, Metropolis",
          roleId: doctorRole._id,
        },
        doctorDetails: {
          expertise: randomExpertise._id,
          location: randomLocation._id,
          workingTime: [
            { day: "Tuesday", start_time: "10:00", end_time: "18:00" },
            { day: "Thursday", start_time: "09:00", end_time: "17:00" },
          ],
        },
      },
    ];

    for (const entry of doctors) {
      let doctorUser = await User.findOne({ email: entry.user.email });
      if (!doctorUser) {
        doctorUser = await User.create(entry.user);
        console.log(`✅ Doctor seeded: ${entry.user.email}`);
        await Doctor.create({
          id: doctorUser._id, // Link to the User model
          expertise: entry.doctorDetails.expertise,
          location: entry.doctorDetails.location,
          workingTime: entry.doctorDetails.workingTime,
        });
        console.log(`✅ Doctor details linked for: ${entry.user.email}`);
        await createEmptyChatLog(doctorUser);
      } else {
        console.log(`ℹ️  Doctor already exists: ${entry.user.email}`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
}

module.exports = seedUsers;
