const { Router } = require("express");
const userController = require("../../controllers/userControllers");
const userRouter = Router();

userRouter.get("", (req, res, next) => userController.getAllUsers(req, res, next))
userRouter.get("/:id", (req, res, next) => userController.getUserById(req, res, next))
userRouter.post("", (req, res, next) => userController.createUser(req, res, next))
userRouter.put("/:id", (req, res, next) => userController.updateUser(req, res, next))
userRouter.delete("/:id", (req, res, next) => userController.deleteUser(req, res, next))

module.exports = userRouter;