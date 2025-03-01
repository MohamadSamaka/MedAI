const doctorRepository = require("../repositories/doctorRepository");
const appointmentRepository = require("../repositories/appointmentRepository");
const appointmentService = require("../services/appointmentService");
const JsonedResponseError = require("../errors/JsonedResponseError");
class DoctorService {
  async createDoctor(data, userReq) {
    try {
      if (!userReq.role.toLowerCase() == "admin") {
        throw new Error("you are not admin! you cant create a new doctor");
      } else {
        // Validate the request body
        const { error } = validateDoctor(req.body);
        if (error) {
          return res
            .status(400)
            .json({ errors: error.details.map((e) => e.message) });
        }
        return await doctorRepository.createDoctor(data);
      }
    } catch (error) {
      throw new JsonedResponseError(err.message, 500)
    }
  }

  async getDoctorById(id) {
    return await doctorRepository.getDoctorbyObjId(id);
  }

  async getAllDoctors() {
    return await doctorRepository.getAllDoctors();
  }

  async getDoctorsByExpertise(expertise) {
    try{
      const docsByExpertiseList = await doctorRepository.getDoctorsByExpertise(expertise)
      console.log(docsByExpertiseList)
      const updatedDoctors = docsByExpertiseList.map(doc => {
        const plainDoc = doc.toObject(); // Convert Mongoose document to plain JavaScript object
        plainDoc.docPersonalInfo = plainDoc.id;
        delete plainDoc.id;
        return plainDoc;
      });
      return updatedDoctors;
      // return docsByExpertiseList

    }catch(error){
      console.log(error)
      throw new JsonedResponseError(error.message, 500)
    }
  }

  async updateDoctor(id, data) {
    return await doctorRepository.updateDoctor(id, data);
  }

  async addAppointment(doctorId, appointment) {
    return await doctorRepository.addAppointment(doctorId, appointment);
  }

  async removeAppointment(doctorId, appointmentId) {
    return await doctorRepository.removeAppointment(doctorId, appointmentId);
  }

  async getDoctorAppointments(doctorId) {
    return await doctorRepository.getDoctorAppointments(doctorId);
  }

  async getAvailableAppointments(doctorId) {
    return await doctorRepository.getAvailableAppointments(doctorId);
  }

  async getFirstAvailableAppointment(doctorId) {
    return await doctorRepository.getFirstAvailableAppointment(doctorId);
  }

  async cancelAppointment(appointmentId) {
    // Fetch appointment details
    const appointment = await appointmentRepository.getAppointmentById(
      appointmentId
    );
    if (!appointment) throw new Error("Appointment not found");

    // Goes to appointment service that calls on all the parties to delete the appointment
    return await appointmentService.cancelAppointment(appointmentId);
  }
}

module.exports = new DoctorService();
