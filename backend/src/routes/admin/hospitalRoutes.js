const { Router } = require("express");
const HospitalController = require("../../controllers/hospitalController");
const hospitalRouter = Router();

// Create a new hospital
hospitalRouter.post('/', (req, res, next) => HospitalController.create(req, res, next));

// Retrieve all hospitals
hospitalRouter.get('/', (req, res, next) => HospitalController.getAll(req, res, next));

// Retrieve a single hospital by ID
hospitalRouter.get('/:id', (req, res, next) => HospitalController.getById(req, res, next));

// Update a hospital
hospitalRouter.put('/:id', (req, res, next) => HospitalController.update(req, res, next));

// Delete a hospital
hospitalRouter.delete('/:id', (req, res, next) => HospitalController.delete(req, res, next));


module.exports = hospitalRouter;