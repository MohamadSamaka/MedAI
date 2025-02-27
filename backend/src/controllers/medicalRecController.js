const medicalRecService = require("../services/medicalRecService");

//all get and post functions

//user can only get info about : prescription , appointments
//doctors can also get but also post so we need to check in each post func if role id is admin or doctor
//doctors dont need to see future appointments of user

class MedicalRecController {
  
  async getMedicalRecord(req, res) {
    try {
      const record = await medicalRecordService.getMedicalRecordByUserId(req.params.userId);
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: "Error fetching medical record" });
    }
  }

  async cancelAppointment(req, res) {
    try {
      await medicalRecordService.cancelAppointment(req.params.appointmentId);
      res.json({ message: "Appointment successfully canceled" });
    } catch (error) {
      res.status(500).json({ message: "Error canceling appointment", error: error.message });
    }
  }

  async getPrescriptions(req, res) {
    try {
      const userIdObj = req.user.id;
      const prescriptions = await medicalRecService.getPrescriptions(userIdObj);
      return res.status(200).json({
        success: true,
        data: prescriptions,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAppointment(req, res){
    try {
      const userIdObj = req.user.id;
      const prescriptions = await medicalRecService.addAppointment(userIdObj);
      return res.status(200).json({
        success: true,
        data: prescriptions,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

}

module.exports = new MedicalRecController();