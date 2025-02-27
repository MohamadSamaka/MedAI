const User = require("../models/userModel");
const MedicalRecord = require("../models/medicalRecordModel");
const ChatLog = require("../models/chatLogModel")
// const Doctor = require("../models/doctorModel")
const Doctor = require("../models/doctorModel")

class UserRepository {
  /**
   * Creates a new user along with associated records.
   *
   * @param {Object} userData - Data for the new user.
   * @param {Object} options - Additional options.
   * @param {Boolean} options.createDoctor - Flag to indicate whether to create a doctor record.
   * @param {Object} [options.doctorData={}] - Doctor-specific data (experties, location, workingTime).
   * @returns {Object} - If a doctor is created, returns { user, doctor }; otherwise, returns the user.
   */
  async createUser(userData, options = {}) {
    let newUser, newMedRecord, newChatLog, newDoctor;
    const { createDoctor = false, doctorData = {} } = options;

    try {
      // 1. Create the user
      newUser = await User.create(userData);
      if (!newUser) {
        throw new Error("User creation failed.");
      }

      // 2. Create the medical record linked to the user
      newMedRecord = await MedicalRecord.create({ userId: newUser._id });
      if (!newMedRecord) {
        await User.findByIdAndDelete(newUser._id);
        throw new Error("Medical record creation failed.");
      }

      // 3. Create the chat log for the user
      newChatLog = await ChatLog.create({ user_id: newUser._id });
      if (!newChatLog) {
        await MedicalRecord.findByIdAndDelete(newMedRecord._id);
        await User.findByIdAndDelete(newUser._id);
        throw new Error("Chat log creation failed.");
      }

      // 4. Update the user with the IDs of the medical record and chat log
      newUser.medicalInfoId = newMedRecord._id;
      newUser.chatLogId = newChatLog._id;
      const updatedUser = await newUser.save();
      if (!updatedUser) {
        await ChatLog.findByIdAndDelete(newChatLog._id);
        await MedicalRecord.findByIdAndDelete(newMedRecord._id);
        await User.findByIdAndDelete(newUser._id);
        throw new Error("User update with associated records failed.");
      }

      // 5. Optionally create a doctor record if the flag is provided
      if (createDoctor) {
        // Verify that necessary doctor data is provided
        if (!doctorData.expertise || !doctorData.workingTime) {
          // Rollback all previously created records if doctor data is incomplete
          await ChatLog.findByIdAndDelete(newChatLog._id);
          await MedicalRecord.findByIdAndDelete(newMedRecord._id);
          await User.findByIdAndDelete(newUser._id);
          throw new Error("Incomplete doctor data provided.");
        }

        newDoctor = await Doctor.create({
          id: newUser._id, // Associate the doctor record with the user
          location: doctorData.location,
          expertise: doctorData.expertise,
          workingTime: doctorData.workingTime,
          // appointments can be left undefined or initialized as an empty array
        });

        if (!newDoctor) {
          await ChatLog.findByIdAndDelete(newChatLog._id);
          await MedicalRecord.findByIdAndDelete(newMedRecord._id);
          await User.findByIdAndDelete(newUser._id);
          throw new Error("Doctor creation failed.");
        }
      }

      // Return both user and doctor (if created) or just the user
      if (createDoctor) {
        return { user: updatedUser, doctor: newDoctor };
      } else {
        return updatedUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    return await User.find()
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).populate("roleId", "roleName");
  }

  async getUserById(id, roleAsName = false) {
    return await User.findById(id).populate("roleId", "roleName").toJSON({roleAsName})
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
