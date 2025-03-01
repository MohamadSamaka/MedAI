const medicalRecService = require("../services/medicalRecService");

//all get and post functions

//user can only get info about : prescription , appointments
//doctors can also get but also post so we need to check in each post func if role id is admin or doctor
//doctors dont need to see future appointments of user

class MedicalRecController {
  
  async getMedicalRecord(req, res, next) {
    try {
      const record = await medicalRecordService.getMedicalRecordByUserId(req.params.userId);
      res.json(record);
    } catch (error) {
      next(error)
    }
  }

  async cancelAppointment(req, res, next) {
    try {
      await medicalRecordService.cancelAppointment(req.params.appointmentId);
      res.json({ message: "Appointment successfully canceled" });
    } catch (error) {
      next(error)
    }
  }

  async getPrescriptions(req, res, next) {
    try {
      const userIdObj = req.user.id;
      const prescriptions = await medicalRecService.getPrescriptions(userIdObj);
      return res.status(200).json({
        success: true,
        data: prescriptions,
      });
    } catch (error) {
      next(error)
    }
  }

  async getAppointment(req, res, next){
    try {
      const userIdObj = req.user.id;
      const prescriptions = await medicalRecService.addAppointment(userIdObj);
      return res.status(200).json({
        success: true,
        data: prescriptions,
      });
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new MedicalRecController();