import User from "../models/userSchema";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const getCurrentUserProfile = async (req : Request, res : Response) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found.");
//   }
// };

// const updateCurrentUserProfile = async (req : Request, res : Response) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.username = req.body.username || user.username;
//     user.email = req.body.email || user.email;

//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
//       user.password = hashedPassword;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       username: updatedUser.username,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// };

const deleteUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
};

const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export {
  getAllUsers,
  //   updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
