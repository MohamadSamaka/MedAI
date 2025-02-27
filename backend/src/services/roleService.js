const roleRepository = require('../repositories/roleRepository');
const { validateRoleCreation } = require('../validators/roleValidator');

class RoleService {
  
  async getAllRoles() {
    return roleRepository.getAllRoles();
  }

  async getRoleById(roleId) {
    return roleRepository.getRoleById(roleId);
  }

  async updateRole(roleId, updateData) {
    return roleRepository.updateRole(roleId, updateData);
  }

  async deleteRole(roleId) {
    return roleRepository.deleteRole(roleId);
  }
}

module.exports = new RoleService();
