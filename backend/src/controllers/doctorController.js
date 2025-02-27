const doctorService = require("../services/doctorService");

class DoctorController {
  async createDoctor(req, res, next){
    try{
      const doctor= await doctorService.createDoctor(req.body, req.user);
      res.status(201).json(doctor);
    }
    catch(error){
      res.status(500).json({ message: "Error fetching doctor" });
      next(error);
    }
  }

  async getDoctor(req, res, next) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.id);
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctor" });
      next(error);
    }
  }

  //this is for admin
  async getAllDoctors(req, res, next) {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors" });
      next(error);
    }
  }


  async getDoctorsByExpertise(req, res,next) {
    try {
      const doctors = await doctorService.getDoctorsByExpertise(req.params.expertise);
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors by expertise" });
      next(error);
    }
  }

  async getDoctorAppointments(req, res, next) {
    try {
      const appointments = await doctorService.getDoctorAppointments(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctor appointments" });
      next(error);
    }
  }

  async getAvailableAppointments(req, res, next) {
    try {
      const appointments = await doctorService.getAvailableAppointments(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching available appointments" });
      next(error);
    }
  }

  //I dont think we need this
  async getFirstAvailableAppointment(req, res, next) {
    try {
      const appointment = await doctorService.getFirstAvailableAppointment(req.params.doctorId);
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching first available appointment" });
      next(error);
    }
  }
///it will call on deleting in user and appointments as well
  async cancelAppointment(req, res, next) {
    try {
      await doctorService.cancelAppointment(req.params.appointmentId);
      res.json({ message: "Appointment successfully canceled" });
    } catch (error) {
      res.status(500).json({ message: "Error canceling appointment", error: error.message });
      next(error);
    }
}

}

module.exports = new DoctorController();
