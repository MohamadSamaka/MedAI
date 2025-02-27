const Expertise = require("../models/expertiseModel");

class ExpertiseRepository {
  async create(data) {
    return await Expertise.create(data);
  }

  async findById(id) {
    return await Expertise.findById(id);
  }

  async getAllExpertiseNames() {
    const expertiseList = await Expertise.find({}, "name");
    return expertiseList.map((exp) => exp.name); 
  }


  async findAll() {
    return await Expertise.find({});
  }

  async update(id, data) {
    return await Expertise.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Expertise.findByIdAndDelete(id);
  }
}

module.exports = new ExpertiseRepository();
