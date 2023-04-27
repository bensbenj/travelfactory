import { Router } from "express";
import { userController } from "../controller/usersCtrl";
import { userValidate } from "../middleware/userValidate";

const userRoutes = Router();

userRoutes
  .get("/", userController.getAll)
  .post("/create", userValidate, userController.create)
  .put("/:id", userValidate, userController.update)
  .delete("/:id", userController.delete);

export default userRoutes;
