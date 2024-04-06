import { Response } from "express";
import { redis } from "../utils/redis";
import userModal from "../models/user.model";

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

// get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModal.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModal.findByIdAndUpdate(id, { role }, { new: true });

  await redis.set(id, JSON.stringify(user));

  res.status(201).json({
    success: true,
    user,
  });
};
