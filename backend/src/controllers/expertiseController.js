const ExpertiseService = require("../services/expertiseService");

class ExpertiseController {
  async create(req, res, next) {
    try {
      const expertise = await ExpertiseService.createExpertise(req.body);
      res.status(201).json(expertise);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const expertise = await ExpertiseService.getExpertiseById(req.params.id);
      res.json(expertise);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const expertises = await ExpertiseService.getAllExpertises();
      res.json(expertises);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const expertise = await ExpertiseService.updateExpertise(req.params.id, req.body);
      res.json(expertise);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ExpertiseService.deleteExpertise(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ExpertiseController();
