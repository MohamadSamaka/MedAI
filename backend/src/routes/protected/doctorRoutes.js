
const { Router } = require("express");

const doctorRouter = Router();

const doctorController = require("../../controllers/doctorController");

doctorRouter.get("/:id",(req, res, next)=> doctorController.getDoctor(req, res, next));
doctorRouter.get("/",(req, res, next)=> doctorController.getAllDoctors(req, res, next));
doctorRouter.get("/expertise/:expertise",(req, res, next)=> doctorController.getDoctorsByExpertise(req, res, next));
//doctorRouter.delete("/cancel-appointment/:appointmentId",(req, res, next)=> doctorController.cancelAppointment(req, res, next));
doctorRouter.get("/:doctorId/availableAppointments",(req, res, next)=> doctorController.getAvailableAppointments(req, res, next));// ret format [{ "date": "2025-02-27", "time": "10:00:00"}]
doctorRouter.get("/:doctorId/appointments",(req, res, next)=> doctorController.getDoctorAppointments(req, res, next));


module.exports = doctorRouter;

