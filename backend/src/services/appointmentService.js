const appointmentRepository = require("../repositories/appointmentRepository");
const medicalRecordRepository = require("../repositories/medicalRecRepository");
const doctorRepository = require("../repositories/doctorRepository");
const JsonedResponseError = require("../errors/JsonedResponseError");
const {
  validateAppointmentCreation,
} = require("../validators/appointmentValidator");

class AppointmentService {
  async createAppointment(data, reqUser) {
    //we get dateTime, doc ID user Id , location
    // Validate data with Joi.
    validateAppointmentCreation(data);
    // Create a new object with the renamed key
    const updatedData = {
      experties: data.experties,
      location: data.location,
      doctor: data.doctorId,
      dateTime: data.dateTime,
    };
    try {
      const appointment = await appointmentRepository.createAppointment(
        updatedData
      );
      // Add appointment to user's medic  al record
      await medicalRecordRepository.addAppointment(reqUser.id, {
        appointment_time: data.dateTime,
        appointment_id: appointment._id,
      });

      // Add appointment to doctor's schedule
      await doctorRepository.addAppointment(data.doctorId, {
        appointment_time: data.dateTime,
        appointment_id: appointment._id,
      });

      return appointment;
    } catch (error) {
      throw new JsonedResponseError(error.message, 500);
    }
  }

  async getAppointmentById(id) {
    return await appointmentRepository.getAppointmentById(id);
  }

  async getAllAppointments() {
    return await appointmentRepository.getAllAppointments();
  }

  //removing from array of appointment of doc and patient then deltes obj
  async cancelAppointment(id, reqUser) {
    const appointment = await appointmentRepository.getAppointmentById(id);

    if (!appointment)
      throw new JsonedResponseError("Appointment not found", 404);
    //if admin or if doc/user that are in the appointment
    if (reqUser.role.toLowerCase() == "doctor") {
      const doc_id = await doctorRepository.getDoctorByUserId(reqUser.id);
      if (doc_id == id.doctor) {
        // Remove from user medical record
        await medicalRecordRepository.removeAppointment(
          appointment.patient,
          id
        );

        // Remove from doctor's schedule
        await doctorRepository.removeAppointment(appointment.doctor, id);

        // Delete appointment from the system
        await appointmentRepository.cancelAppointment(id);
      }
    } else if (
      reqUser.role.toLowerCase() == "admin" ||
      appointment.patient == reqUser.id
    ) {
      // Remove from user medical record
      await medicalRecordRepository.removeAppointment(appointment.patient, id);

      // Remove from doctor's schedule
      await doctorRepository.removeAppointment(appointment.doctor, id);

      // Delete appointment from the system
      await appointmentRepository.cancelAppointment(id);
    } else {
      throw new JsonedResponseError(
        "You are not allowed to cancel someone elses appointment",
        404
      );
    }
  }

  //Removing appointments that already happened in users and doc future appointments
  //*use func in service to go through array of appointments do remove those who are done
  async removeAppointment(id) {
    const appointment = await appointmentRepository.getAppointmentById(id);

    if (!appointment) throw new Error("Appointment not found");

    // Remove from user medical record
    await medicalRecordRepository.removeAppointment(appointment.patient, id);

    // Remove from doctor's schedule
    await doctorRepository.removeAppointment(appointment.doctor, id);
  }

  //users Future Appointments
  async getUserFutrueAppointments(userId, reqUserId) {
    if (reqUser.role.toLowerCase() == "admin" || reqUserId == userId) {
      const medicalRecord = await MedicalRecord.findOne({ userId });
      if (
        !medicalRecord ||
        !medicalRecord.appointmentId ||
        medicalRecord.appointmentId.length === 0
      ) {
        return res
          .status(404)
          .json({ message: "No upcoming appointments found" });
      }

      // Get all appointments by IDs
      const allAppointments = await appointmentRepository.getAppointmentById(
        medicalRecord.appointmentId
      );

      // Get the current date-time to make sure its sorted
      const currentDateTime = new Date();
      const futureAppointments = allAppointments.filter(
        (appointment) => new Date(appointment.dateTime) >= currentDateTime
      );
      if (futureAppointments.length === 0) {
        throw new Error("No upcoming appointments found");
      }
      // Format response
      return futureAppointments.map((appointment) => ({
        dateTime: appointment.dateTime,
        appointment: appointment, // Full appointment details
      }));
    } else {
      return new Error("You are now allowed to see this data");
    }
  }

  async getDoctorFutureAppointments(doctorId, reqUser) {
    const doc = doctorRepository.getDoctorbyObjId(doctorId);
    if (
      reqUser.role.toLowerCase() == "admin" ||
      (reqUser.role.toLowerCase() == "doctor" && doc.id == reqUser)
    ) {
      // Fetch all appointments for the doctor
      const allAppointments =
        await appointmentRepository.getAppointmentsByDoctorId(doctorId);

      // Filter only future appointments
      const currentDateTime = new Date();
      const futureAppointments = allAppointments.filter(
        (appointment) => new Date(appointment.dateTime) >= currentDateTime
      );

      if (futureAppointments.length === 0) {
        throw new Error("No upcoming appointments found for this doctor");
      }

      // Format response
      return futureAppointments.map((appointment) => ({
        dateTime: appointment.dateTime,
        appointment: appointment, // Full appointment details
      }));
    } else {
      return new Error("You are not allowed to access this data");
    }
  }

  //FOR ADMINS
  async getAppointmentsByUser(userId) {
    return await appointmentRepository.getAppointmentsByUser(userId);
  }

  async getAppointmentsByDoctor(doctorId) {
    return await appointmentRepository.getAppointmentsByDoctor(doctorId);
  }
}

module.exports = new AppointmentService();
