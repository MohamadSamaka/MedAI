const Role = require("../models/roleModel");

class RoleRepository {
  
  async getAllRoles() {
    return await Role.find();
  }

  async getRoleById(id) {
    return await Role.findById(id);
  }

  async updateRole(id, roleData) {
    return await Role.findByIdAndUpdate(id, roleData, { new: true });
  }

  async deleteRole(id) {
    return await Role.findByIdAndDelete(id);
  }
}

module.exports = new RoleRepository();
