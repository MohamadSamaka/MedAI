const { Router } = require("express");
const adminRouter = Router()
const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const userRouter = require("./userRoutes");
const expertiesRouter = require("./expertiseRoutes");
const roleRouter = require("./roleRoutes");
const hospitalsRouter = require("./hospitalRoutes");
const locationRouter = require("./locationRoutes");
const appointmentRouter = require("./appointmentRoutes");

adminRouter.use(authMiddleware)//procted routes
adminRouter.use(adminMiddleware)

adminRouter.use("/user", userRouter)
adminRouter.use("/role", roleRouter)
adminRouter.use("/expertise", expertiesRouter)
adminRouter.use("/hospital", hospitalsRouter)
adminRouter.use("/appointment", appointmentRouter)
adminRouter.use("/location", locationRouter) //should this be public or not?

module.exports = adminRouter