
const { Router } = require("express");

const appointmentRouter = Router();

const appointmentController = require("../../controllers/appointmentController");
//the ids are appoinment id 
appointmentRouter.post("/",(req, res, next)=> appointmentController.createAppointment(req, res, next));
appointmentRouter.delete("/:id",(req, res, next)=> appointmentController.cancelAppointment(req, res, next));

appointmentRouter.get("/:userId",(req, res, next) => appointmentController.getUserFutrueAppointments(req, res, next));//user fetching his future appointments
appointmentRouter.get("/:userId/:doctorId",(req, res, next)=> appointmentController.getDoctorFutureAppointments(req, res, next));//doctor fetching his future appointments


module.exports = appointmentRouter;