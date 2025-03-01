const Location = require("../models/locationModel");

class LocationRepository {
  async create(data) {
    return await Location.create(data);
  }

  async findById(id) {
    return await Location.findById(id);
  }

  async findAll() {
    return await Location.find({});
  }

  async update(id, data) {
    return await Location.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Location.findByIdAndDelete(id);
  }

  
/**
 * Find a location by name.
 */
async findLocationByName(locationName) {
  return await Location.findOne({ locationName });
}

/**
* Find multiple locations by name.
*/
async findLocationsByNames(locationNames) {
  return await Location.find({ locationName: { $in: locationNames } });
}
}

module.exports = new LocationRepository();
