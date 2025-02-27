const Locations = require("../models/locationModel");

class LocationRepository {
  async create(data) {
    return await Locations.create(data);
  }

  async findById(id) {
    return await Locations.findById(id);
  }

  async findAll() {
    return await Locations.find({});
  }

  async update(id, data) {
    return await Locations.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Locations.findByIdAndDelete(id);
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
