const userService = require("../services/userService");

class UserController {
  async createUser(req, res, next) {
    try {
      const userId = await userService.createUser(req.body);
      res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
      next(error)
    }
  }
  
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error)
    }
  }


  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id, true);
      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error)
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUser = await userService.updateUser(id, updateData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      next(error)
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedUser,
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController();
