const { Router } = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const protectedRouter = Router();
const ProtectedAppointmentRouter = require("./appointmentRoutes");
const ProtectedexpertiesRouter = require("./expertiseRoutes");
const ProtectedChatbotRouter = require("./chatbotRoutes")
protectedRouter.use(authMiddleware)

protectedRouter.use("/appointment", ProtectedAppointmentRouter)
protectedRouter.use("/expertise", ProtectedexpertiesRouter)
protectedRouter.use("/chat", ProtectedChatbotRouter)
protectedRouter.use("/doctor", ProtectedChatbotRouter)

module.exports = protectedRouter;

