const { Router } = require("express");
const LocationController = require("../../controllers/locationController");
const publicRouter = Router();

publicRouter.get("/location", (req, res, next) => LocationController.getAll(req, res, next));
publicRouter.get("/location-getClosest", (res, req, next) => LocationController.getClosestLocations(req, res, next));

module.exports = publicRouter;

