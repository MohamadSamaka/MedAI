const { Router } = require("express");
const medicalRecController = require("../../controllers/medicalRecController");
const medicalRecRouter = Router();


medicalRecRouter.get("/prescriptions", (req, res, next) => medicalRecController.getPrescriptions(req, res, next));
medicalRecRouter.get("/:userId", (req, res, next) => medicalRecController.getMedicalRecord(req, res, next));
medicalRecRouter.delete("/cancel-appointment/:appointmentId", (req, res, next) => medicalRecController.cancelAppointment(req, res, next)); // ✅ Cancel Appointment
medicalRecRouter.get("/:userId/myAppointments", (req, res, next) => medicalRecController.getAppointment(req, res, next));

module.exports = medicalRecRouter; 