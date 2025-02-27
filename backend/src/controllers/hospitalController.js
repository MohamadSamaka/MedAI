const HospitalService = require('../services/hospitalService');

class HospitalController {
  async create(req, res, next) {
    try {
      const hospital = await HospitalService.createHospital(req.body);
      res.status(201).json(hospital);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const hospital = await HospitalService.getHospitalById(req.params.id);
      res.json(hospital);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const hospitals = await HospitalService.getAllHospitals();
      res.json(hospitals);
    } catch (error) {
        console.log(error)
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const hospital = await HospitalService.updateHospital(req.params.id, req.body);
      res.json(hospital);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await HospitalService.deleteHospital(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HospitalController();
