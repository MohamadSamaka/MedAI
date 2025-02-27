const { Router } = require("express");
const authRouter = require("./authRoutes");
const publicRouter = require("./public/index.js")
const protectedRouter = require("./protected/index.js")
const adminRouter = require("./admin");
const appRouter = Router()
const medicalRecRouter = require("./medicalRecordRoutes");

appRouter.use("/api/auth", authRouter);
appRouter.use("/api/admin", adminRouter)
appRouter.use("/api/public", publicRouter)
appRouter.use("/api/protected", protectedRouter)
appRouter.use("/api/", medicalRecRouter)


module.exports = appRouter