
const Appointment = require("../models/appointmentModel");


class AppointmentRepository {
  
  async createAppointment(data) {
    return await Appointment.create(data);
  }

  async getAppointmentById(id) {
    return await Appointment.findById(id).populate("doctor patient");
  }

  async getAllAppointments() {
    return await Appointment.find().populate("doctor patient");
  }

  //for future appointments
  async getAppointmentsByIds(appointmentIds){
    return await Appointment.find({ _id: { $in: appointmentIds } }).sort({ dateTime: 1 });
};

//docs future appointments
async getAppointmentsByDoctorId(doctorId){
  return await Appointment.find({ doctorId }).sort({ dateTime: 1 });
}


  async cancelAppointment(id) {
    return await Appointment.findByIdAndDelete(id);
  }

//for admin-FOR FUTURE USE TO ACCESS ALL OF THE APPOINTMENTS HE EVER HAD
  async getAppointmentsByUser(userId) {
    
    return await Appointment.find({ _id: { $in: appointmentIds } }).sort({ dateTime: 1 });
  }
//for admin
  async getAppointmentsByDoctor(doctorId) {
    return await Appointment.find({ doctor: doctorId }).populate("patient");
  }




}

module.exports = new AppointmentRepository();


