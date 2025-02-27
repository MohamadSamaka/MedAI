const roleService = require("../services/roleService");

class RoleController {
 
  async getAllRoles(req, res, next) {
    try {
      const roles = await roleService.getAllRoles();
      return res.status(200).json({
        success: true,
        data: roles,
      });
    } catch (error) {
      next(error)
    }
  }

  
///check what is dis for
  async getRoleById(req, res, next) {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Role not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: role,
      });
    } catch (error) {
      next(error)
    }
  }

  async updateRole(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedRole = await roleService.updateRole(id, updateData);

      if (!updatedRole) {
        return res.status(404).json({
          success: false,
          message: "Role not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedRole,
      });
    } catch (error) {
      next(error)
    }
  }

  async deleteRole(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRole = await roleService.deleteRole(id);

      if (!deletedRole) {
        return res.status(404).json({
          success: false,
          message: "Role not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedRole,
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new RoleController();
