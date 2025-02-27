const { Router } = require("express");
const LocationController = require("../../controllers/locationController");
const LocationRouter = Router();

LocationRouter.post("/", (req, res, next) =>
  LocationController.create(req, res, next)
);
LocationRouter.get("/", (req, res, next) =>
  LocationController.getAll(req, res, next)
);
LocationRouter.get("/:id", (req, res, next) =>
  LocationController.getById(req, res, next)
);
LocationRouter.put("/:id", (req, res, next) =>
  LocationController.update(req, res, next)
);
LocationRouter.delete("/:id", (req, res, next) =>
  LocationController.delete(req, res, next)
);


module.exports = LocationRouter;
