const { Router } = require("express");
const publicRouter = Router();
const PublicLocationRouter = require("./locationRoutes")

publicRouter.use("/location", PublicLocationRouter)

module.exports = publicRouter;

