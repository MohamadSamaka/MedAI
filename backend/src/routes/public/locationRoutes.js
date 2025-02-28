const { Router } = require("express");
const LocationController = require("../../controllers/locationController");
const PublicLocationRouter = Router();


PublicLocationRouter.get("/", (req, res, next) =>
  LocationController.getAll(req, res, next)
);
PublicLocationRouter.get("/:id", (req, res, next) =>
  LocationController.getById(req, res, next)
);
PublicLocationRouter.get("/:id", (req, res, next) =>
  LocationController.getClosestLocations(req, res, next)
);

PublicLocationRouter.get("/", (req, res, next) => LocationController.getAll(req, res, next));
PublicLocationRouter.get("/closest/:locationId", (res, req, next) => LocationController.getClosestLocations(req, res, next));



module.exports = PublicLocationRouter;
