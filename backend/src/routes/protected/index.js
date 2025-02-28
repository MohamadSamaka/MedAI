const { Router } = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const protectedRouter = Router();
const ProtectedAppointmentRouter = require("./appointmentRoutes");
const ProtectedexpertiesRouter = require("./expertiseRoutes");
const ProtectedChatbotRouter = require("./chatbotRoutes");
const protectedLocationsRouter= require("./locationRoutes");
const protectedMedicalRecordRouter=require("./medicalRecordRoutes");
protectedRouter.use(authMiddleware)

protectedRouter.use("/appointment", ProtectedAppointmentRouter)
protectedRouter.use("/expertise", ProtectedexpertiesRouter)
protectedRouter.use("/chat", ProtectedChatbotRouter)
protectedRouter.use("/doctor", ProtectedChatbotRouter)
protectedRouter.use("/location", protectedLocationsRouter)
protectedRouter.use("/medicalRecord", protectedMedicalRecordRouter)
module.exports = protectedRouter;

