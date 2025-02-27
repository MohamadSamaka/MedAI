const { Router } = require("express");
const ExpertiseController = require("../../controllers/expertiseController");
const expertiesRouter = Router();

// Create a new expertise
expertiesRouter.post("/", (req, res, next) => ExpertiseController.create(req, res, next));

// Get all expertises
expertiesRouter.get("/", (req, res, next) => ExpertiseController.getAll(req, res, next));

// Get expertise by ID
expertiesRouter.get("/:id", (req, res, next) => ExpertiseController.getById(req, res, next));

// Update expertise
expertiesRouter.put("/:id", (req, res, next) => ExpertiseController.update(req, res, next));

// Delete expertise
expertiesRouter.delete("/:id", (req, res, next) => ExpertiseController.delete(req, res, next));

module.exports = expertiesRouter;
