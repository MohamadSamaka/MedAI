const medicalRecModel = require("../models/medicalRecordModel");

class MedicalRecRepository {
  async getRecordByUserId(userId) {
    return await medicalRecModel.findOne({ userId });
  }

  async addAppointment(userId, appointment) {
    return await medicalRecModel.findOneAndUpdate(
      { userId: userId },
      { $push: { appointmentId: appointment } },
      { new: true }
    );
  }

  
  async getUserAppointments(reqUser) {
    const userRecord= this.getRecordByUserId(reqUser)
    return await userRecord.appointmentId;
  }
  //

  async updateMedicalRecord(id, data) {
    return await medicalRecModel.findByIdAndUpdate(id, data, { new: true });
  }
  //updating future appointment list
  async removePastAppointments(userId, today) {
    return await medicalRecModel.findOneAndUpdate(
      { userId },
      { $pull: { appointmentId: { appointment_time: { $lt: today } } } },
      { new: true }
    );
  }
  //for canceling
  async removeAppointment(userId, appointmentId) {
    return await medicalRecModel.findOneAndUpdate(
      { userId },
      {
        $pull: {
          appointmentId: { appointment_time, appointment_id: appointmentId },
        },
      },
      { new: true }
    );
  }

  async getPrescriptions(userId) {
    //this returns all of the medical record we need the prescreption
    const prescriptions = await medicalRecModel.findOne(
      { userId },
      "prescriptions"
    );
    return prescriptions;
  }

  async getDiagnosis(userId) {
    //this returns all of the medical record we need the diagnosis
    const diagnosis = await medicalRecModel.findOne({ userId }, "diagnosis");
    return diagnosis;
  }

  //returns the future appointments array
  async getAppointments(userId) {
    return await medicalRecModel.findOne({ userId }, "appointmentId");
  }
}

module.exports = new MedicalRecRepository();
