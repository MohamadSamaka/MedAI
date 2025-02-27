const HospitalRepository = require('../repositories/hospitalRepository');
const locationRepository = require('../repositories/locationRepository')
const Doctor = require("../models/doctorModel");

const JsonedResponseError = require('../errors/JsonedResponseError');
const { validateHospitalCreation } = require('../validators/hospitalsValidator');

class HospitalService {
  async createHospital(data) {
    validateHospitalCreation(data)
    try {
      const location = await locationRepository.findById(data.location)
      if(!location)
        throw new JsonedResponseError("Make sure you sent the current location ID", 400);
      if (data.doctors) {
        for (const doctorId of data.doctors) {
          const doctor = await Doctor.findById(doctorId);
          if (!doctor) {
            throw new JsonedResponseError(`Doctor not found with id: ${doctorId}`, 404);
          }
        }
        data.doctor = data.doctors[0];
      } 
      const hospital = await HospitalRepository.create(data);
      return hospital;
    } catch (error) {
      throw new JsonedResponseError(error.message, 500);
    }
  }

  async getHospitalById(id) {
    try {
      const hospital = await HospitalRepository.findById(id);
      if (!hospital) {
        throw new JsonedResponseError("Hospital not found", 404);
      }
      return hospital;
    } catch (error) {
      if (error instanceof JsonedResponseError) {
        throw error;
      }
      throw new JsonedResponseError("Failed to retrieve hospital", 500);
    }
  }

  async getAllHospitals() {
    try {
      const hospitals = await HospitalRepository.findAll();
      return hospitals;
    } catch (error) {
      console.log(error)
      throw new JsonedResponseError("Failed to retrieve hospitals", 500);
    }
  }

  async updateHospital(id, data) {
    try {
      const hospital = await HospitalRepository.update(id, data);
      if (!hospital) {
        throw new JsonedResponseError("Hospital not found", 404);
      }
      return hospital;
    } catch (error) {
      if (error instanceof JsonedResponseError) {
        throw error;
      }
      throw new JsonedResponseError("Failed to update hospital", 500);
    }
  }

  async deleteHospital(id) {
    try {
      const hospital = await HospitalRepository.delete(id);
      if (!hospital) {
        throw new JsonedResponseError("Hospital not found", 404);
      }
      return hospital;
    } catch (error) {
      if (error instanceof JsonedResponseError) {
        throw error;
      }
      throw new JsonedResponseError("Failed to delete hospital", 500);
    }
  }
}

module.exports = new HospitalService();
