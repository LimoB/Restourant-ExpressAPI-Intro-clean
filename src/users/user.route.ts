import { Router } from "express";
import {
  createUserHandler, // renamed from createUser
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from "./user.controller";
import { adminRoleAuth, bothRolesAuth, userRoleAuth } from "../middleware/bearAuth";

export const userRouter = Router();

// User routes definition

// Get all users (admin only)
userRouter.get('/users', adminRoleAuth, getUsers);

// Get user by ID
userRouter.get('/users/:id', getUserById);

// Create a new user
userRouter.post('/users', createUserHandler); // 🔄 updated function name

// Update an existing user
userRouter.put('/users/:id', updateUser);

// Delete an existing user (admin only)
userRouter.delete('/users/:id', adminRoleAuth, deleteUser);
