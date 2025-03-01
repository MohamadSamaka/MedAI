const doctorService = require("../services/doctorService");

class DoctorController {
  async createDoctor(req, res, next){
    try{
      const doctor= await doctorService.createDoctor(req.body, req.user);
      res.status(201).json(doctor);
    }
    catch(error){
      next(error);
    }
  }

  async getDoctor(req, res, next) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.id);
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  }

  //this is for admin
  async getAllDoctors(req, res, next) {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.json(doctors);
    } catch (error) {
      next(error);
    }
  }


  async getDoctorsByExpertise(req, res, next) {
    try {
      console.log(req.params.expertise)
      const doctors = await doctorService.getDoctorsByExpertise(req.params.expertise);
      res.json(doctors);
    } catch (error) {
      next(error);
    }
  }

  async getDoctorAppointments(req, res, next) {
    try {
      const appointments = await doctorService.getDoctorAppointments(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getAvailableAppointments(req, res, next) {
    try {
      console.log(req.params)
      const appointments = await doctorService.getAvailableAppointments(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  //I dont think we need this
  async getFirstAvailableAppointment(req, res, next) {
    try {
      const appointment = await doctorService.getFirstAvailableAppointment(req.params.doctorId);
      res.json(appointment);
    } catch (error) {
      next(error);
    }
  }
///it will call on deleting in user and appointments as well
  async cancelAppointment(req, res, next) {
    try {
      await doctorService.cancelAppointment(req.params.appointmentId);
      res.json({ message: "Appointment successfully canceled" });
    } catch (error) {
      next(error);
    }
}

}

module.exports = new DoctorController();
