const { Router } = require("express");
const ExpertiseController = require("../../controllers/expertiseController");
const ProtectedexpertiesRouter = Router();

ProtectedexpertiesRouter.get("/", (req, res, next) => ExpertiseController.getAll(req, res, next));

module.exports = ProtectedexpertiesRouter;
