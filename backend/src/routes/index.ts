import { Router } from "express";
import userRoutes from "./usersRoute";

const route = Router();

route.use("/users", userRoutes);

export default route;
