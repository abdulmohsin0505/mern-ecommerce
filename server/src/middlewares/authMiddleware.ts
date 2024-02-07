import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userSchema";

// interface CustomResponse extends Response {
//   email?: string;
// }
interface UserRequest extends Request {
  //   user?: {
  //     // Define the structure of the user object
  //     isAdmin: boolean;
  //     // Other user properties...
  //   };
  email?: string;
  id: string;
  user?: any;
}
const authenticate = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  console.log("accessToken", accessToken);
  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err: any, decoded: { _id: string }) => {
        if (err) {
          return res.json({ valid: false, message: err });
        } else {
          const user = await User.findById(decoded._id).select("-password");
          req.user = { _id: user._id, username: user.username };
          next();
        }
      }
    );
  }
};

const renewToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken", refreshToken);
  let exist = false;
  if (!refreshToken) {
    res.json({ valid: false, message: "No refresh token" });
  } else {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: any, decoded: any) => {
        if (err) {
          return res.json({ valid: false, message: "Invalid refresh token" });
        } else {
          const accessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("accessToken", accessToken, { maxAge: 60 * 60 * 1000 });
          exist = true;
        }
      }
    );
  }
  return exist;
};

const authorizeAdmin = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};
export { authenticate, authorizeAdmin };
