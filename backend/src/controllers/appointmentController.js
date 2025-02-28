const appointmentService = require("../services/appointmentService");

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.createAppointment(
        req.body,
        req.user
      );
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async getAppointmentById(req, res, next) {
    try {
      const appointment = await appointmentService.getAppointmentById(
        req.params.id
      );
      res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async getAllAppointments(req, res, next) {
    try {
      const appointments = await appointmentService.getAllAppointments();
      res.json(appointments);
    }catch (error) {
      next(error);
    }
  }

  async cancelAppointment(req, res, next) {
    try {
      await appointmentService.cancelAppointment(req.params.id, req.user);
      res.json({ message: "Appointment canceled" });
    } catch (error) {
      next(error);
    }
  }

  async getUserFutrueAppointments(req, res, next){
    try {
      const reqUser = req.user.id; // Get user ID from authentication middleware

      // Fetch sorted future appointments
      const appointments = await appointmentService.getUserFutureAppointments(reqUser);

      res.json({ appointments });
  } catch (error) {
      next(error)
  }

  }

  async  getDoctorFutureAppointments(req, res, next){
    try{
    
      const doctorId = req.params.doctorId;
      const reqUser=req.params.userId;
      
      const appointments = await appointmentService.getDoctorFutureAppointments(doctorId, reqUser);
      res.json({ appointments });

      } catch(error){
    next(error)
  }
}


  //admins
  async getAppointmentsByUser(req, res, next) {
    try {
  
      const appointments = await appointmentService.getAppointmentsByUser(
        req.params.userId
      );
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getAppointmentsByDoctor(req, res, next) {
    try {
      const appointments = await appointmentService.getAppointmentsByDoctor(
        req.params.doctorId
      );
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();
