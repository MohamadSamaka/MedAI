const JsonedResponseError = require("../errors/JsonedResponseError");
const MedicalRecRes = require("../repositories/medicalRecRepository");
const appointmentRepository = require("../repositories/appointmentRepository");
const appointmentService = require("../services/appointmentService");


class MedicalRecService {
  async getMedicalRecordByUserId(userId) {
    return await medicalRecordRepository.getMedicalRecordByUserId(userId);
  }

  // ✅ New Method: Cancel Appointment
  async cancelAppointment(appointmentId) {
    // Fetch appointment details
    const appointment = await appointmentRepository.getAppointmentById(appointmentId);
    if (!appointment) throw new Error("Appointment not found");

    // Delete appointment object and in appointments of doc and user
    await appointmentService.cancelAppointment(appointmentId);
  }

  async getPrescriptions(userId) {
    return MedicalRecRes.getPrescriptions(userId);
  }

  async getDiagnosis(userId){
    return MedicalRecRes.getDiagnosis(userId);
  }

  async getAppointments(userId){
    return MedicalRecRes.getAppointments(userId);
  }

  async addAppointment(userId, appointment) {
    return await medicalRecordRepository.addAppointment(userId, appointment);
  }

  async removeAppointment(userId, appointmentId) {
    return await medicalRecordRepository.removeAppointment(userId, appointmentId);
  }

}

module.exports = new MedicalRecService();
