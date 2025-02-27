const LocationService = require("../services/locationService");
const LocationRepository= require("../repositories/locationRepository");

class LocationController {
  async create(req, res, next) {
    try {
      const location = await LocationService.createLocation(req.body);
      res.status(201).json(location);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const location = await LocationService.getLocationById(req.params.id);
      res.json(location);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const locations = await LocationService.getAllLocations();
      res.json(locations);
    } catch (error) {
      next(error);
    }
  }


  async getClosestLocations(req, res, next) {
    try {
        const locationId = req.params.locationId;

        // Find the reference location by ID
        const location = await LocationRepository.findLocationByName({ _id: locationId });

        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }

        // Get sorted closest locations' IDs
        const sortedLocationIds = await LocationRepository.getClosestLocationIds(location.locationName);

        res.json({ sortedLocationIds });
    } catch (error) {
        next(error)
    }
}


  async update(req, res, next) {
    try {
      const location = await LocationService.updateLocation(req.params.id, req.body);
      res.json(location);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await LocationService.deleteLocation(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LocationController();
