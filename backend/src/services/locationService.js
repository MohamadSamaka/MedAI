const LocationRepository = require("../repositories/locationRepository");
const { validateLocationCreation, validateLocationUpdate } = require("../validators/locationValidator");
const JsonedResponseError = require("../errors/JsonedResponseError");
const fs = require("fs");

class LocationService {
  ///not for now
  async createLocation(data) {
    validateLocationCreation(data);
    return await LocationRepository.create(data);
  }

  async getLocationById(id) {
    const location = await LocationRepository.findById(id);
    if (!location) throw new JsonedResponseError("Location not found", 404);
    return location;
  }

  async getAllLocations() {
    return await LocationRepository.findAll();
  }

async closestLocation(locationId){
  
// Load distance matrix from the `/data` folder
const distances = JSON.parse(fs.readFileSync(path.join(__dirname, "utils/distances.json"), "utf-8"));

/**
 * Get sorted location IDs from closest to farthest.
 * @param {string} locationName - The name of the reference location.
 * @returns {Promise<Array>} - Sorted array of location IDs.
 */
async function getClosestLocationIds(locationName) {
    if (!distances[locationName]) {
        throw new Error(`Location '${locationName}' not found in distance matrix.`);
    }

    // Get sorted city names by distance
    const sortedCityNames = Object.entries(distances[locationName])
        .sort((a, b) => a[1] - b[1]) // Sort by distance
        .map(([city]) => city); // Extract city names

    // Fetch corresponding IDs from MongoDB
    const locations = await LocationRepository.findLocationsByNames(sortedCityNames);

    // Create a name-to-ID mapping
    const nameToIdMap = Object.fromEntries(locations.map(loc => [loc.locationName, loc._id]));

    // Convert sorted names to their IDs
    return sortedCityNames.map(name => nameToIdMap[name]);
}
}

  async updateLocation(id, data) {
    validateLocationUpdate(data);
    const location = await LocationRepository.update(id, data);
    if (!location) throw new JsonedResponseError("Location not found", 404);
    return location;
  }

  async deleteLocation(id) {
    const location = await LocationRepository.delete(id);
    if (!location) throw new JsonedResponseError("Location not found", 404);
    return location;
  }
}

module.exports = new LocationService();
