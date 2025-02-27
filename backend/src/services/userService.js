const JsonedResponseError = require("../errors/JsonedResponseError");
const userRepository = require("../repositories/userRepository");
const roleRepository = require("../repositories/roleRepository");

const { validateUserCreation } = require("../validators/userValidtors");

class UserService {
  async createUser(creatingUserData) {
    try {
      validateUserCreation(creatingUserData);
      const existingUser = await userRepository.getUserByEmail(
        creatingUserData.email
      );
      const role = await roleRepository.getRoleById(
        creatingUserData.userData.roleId
      );
      if (!role) throw new JsonedResponseError("Sent Role Doesn't Exist", 400);
      if (existingUser)
        throw new JsonedResponseError("User already exists", 409);
      // if (
      //   role.roleName.toLowerCase() !== "doctor" &&
      //   creatingUserData.doctorData
      // )
      //   throw new JsonedResponseError(
      //     "User is not of type doctor, you can't provide doctor data",
      //     409
      //   );
      if (
        role.roleName.toLowerCase() === "doctor" &&
        !creatingUserData.doctorData
      )
        throw new JsonedResponseError(
          "Please Provide the doctor data to create a doctor",
          404
        );
      if (
        role.roleName.toLowerCase() === "doctor" &&
        creatingUserData.doctorData
      ) {
        const createdUser = await userRepository.createUser(
          creatingUserData.userData,
          { doctorData: creatingUserData.doctorData, createDoctor: true }
        );
        return createdUser._id;
      }
      const createdUser = await userRepository.createUser(creatingUserData);
      return createdUser._id;
    } catch (error) {
      console.log(error);
      if (error instanceof JsonedResponseError) throw error;
      else throw new JsonedResponseError(error.message, 500);
    }
  }

  async getAllUsers(populateRoleId = false) {
    const users = await userRepository.getAllUsers(populateRoleId);
    return populateRoleId
      ? users.map((user) => {
          user.role = user.roleId.name;
          delete user.roleId;
          return user;
        })
      : users;
  }

  async getUserById(userId, populateRoleId = false) {
    const user = await userRepository.getUserById(userId, populateRoleId);
    if (!user) throw new JsonedResponseError("User doesn't exists", 409);
    if (populateRoleId) {
      user.role = user.roleId.name;
      delete user.roleId;
    }
    return user;
  }

  async updateUser(userId, updateData) {
    return userRepository.updateUser(userId, updateData);
  }

  async deleteUser(userId) {
    return userRepository.deleteUser(userId);
  }
}

module.exports = new UserService();
