const ExpertiseRepository = require("../repositories/expertiseRepository");
const { validateExpertiseCreation, validateExpertiseUpdate } = require("../validators/expertiseValidator");
const JsonedResponseError = require("../errors/JsonedResponseError");

class ExpertiseService {
  async createExpertise(data) {
    // Validate the input data
    validateExpertiseCreation(data);
    return await ExpertiseRepository.create(data);
  }

  async getExpertiseById(id) {
    const expertise = await ExpertiseRepository.findById(id);
    if (!expertise) throw new JsonedResponseError("Expertise not found", 404);
    return expertise;
  }

  async getAllExpertises() {
    return await ExpertiseRepository.findAll();
  }

  async updateExpertise(id, data) {
    // Validate update payload
    validateExpertiseUpdate(data);
    const expertise = await ExpertiseRepository.update(id, data);
    if (!expertise) throw new JsonedResponseError("Expertise not found", 404);
    return expertise;
  }

  async deleteExpertise(id) {
    const expertise = await ExpertiseRepository.delete(id);
    if (!expertise) throw new JsonedResponseError("Expertise not found", 404);
    return expertise;
  }
}

module.exports = new ExpertiseService();
