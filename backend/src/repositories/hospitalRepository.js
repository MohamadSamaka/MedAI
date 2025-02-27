const Hospital = require('../models/hospitalModel');

class HospitalRepository {
  async create(data) {
    return await Hospital.create(data);
  }

  async findById(id) {
    return await Hospital.findById(id).populate('location doctors');
  }

  async findAll() {
    return await Hospital.find().populate('location doctors');
  }

  async update(id, data) {
    return await Hospital.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Hospital.findByIdAndDelete(id);
  }
}

module.exports = new HospitalRepository();
