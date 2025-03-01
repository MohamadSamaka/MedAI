const { Router } = require("express");
const LocationController = require("../../controllers/locationController");
const PublicLocationRouter = Router();

PublicLocationRouter.get("/", (req, res, next) =>
  LocationController.getAll(req, res, next)
);

module.exports = PublicLocationRouter;
