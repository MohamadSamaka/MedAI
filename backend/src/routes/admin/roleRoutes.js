const { Router } = require("express");
const roleController = require("../../controllers/roleController");
const roleRouter = Router();

roleRouter.get("", (req, res, next) => roleController.getAllRoles(req, res, next))
roleRouter.get("/:id", (req, res, next) => roleController.getRoleById(req, res, next))
roleRouter.put("/:id", (req, res, next) => roleController.updateRole(req, res, next))
roleRouter.delete("", (req, res, next) => roleController.deleteRole(req, res, next))


module.exports = roleRouter;