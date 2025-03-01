const { Router } = require("express");
const LocationController = require("../../controllers/locationController");
const LocationRouter = Router();


LocationRouter.get("/", (req, res, next) =>
  LocationController.getAll(req, res, next)
);
LocationRouter.get("/:id", (req, res, next) =>
  LocationController.getById(req, res, next)
);
LocationRouter.get("/closest/:locationId", (req, res, next) =>
  LocationController.getClosestLocations(req, res, next)
);


module.exports = LocationRouter;
