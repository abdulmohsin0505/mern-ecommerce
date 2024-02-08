import express from "express";
import { register, login, logout, me } from "../controllers/authController";
import {
  deleteUserById,
  getUserById,
  updateUserById,
  getAllUsers,
} from "../controllers/userControllers";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

//auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", me);

//admin
router.get("/", getAllUsers);
router
  .route("/:id")
  .delete(deleteUserById)
  .get(getUserById)
  .put(updateUserById);

export default router;
