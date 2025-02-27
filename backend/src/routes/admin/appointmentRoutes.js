const { Router } = require("express");
const AppointmentController = require("../../controllers/appointmentController");
const appointmentRouters = Router();

appointmentRouters.post("/", (req, res, next) => AppointmentController.createAppointment(req, res, next));
appointmentRouters.get("/", (req, res, next) => AppointmentController.getAllAppointments(req, res, next));
appointmentRouters.get("/:id", (req, res, next) => AppointmentController.getAppointmentById(req, res, next));
appointmentRouters.delete("/:id", (req, res, next) => AppointmentController.cancelAppointment(req, res, next));
appointmentRouters.get("/:userId",(req, res, next) => appointmentController.getUserFutrueAppointments(req, res, next));//user fetching his future appointments
appointmentRouters.get("/:doctorId",(req, res, next)=> appointmentController.getAppointmentsByDoctor(req, res, next));//doctor fetching his future appointments



module.exports = appointmentRouters;
