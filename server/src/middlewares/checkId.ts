import { isValidObjectId } from "mongoose";
import { NextFunction, Request, Response } from "express";

export const checkId = (req: Request, res: Response, next: NextFunction) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404).json({ error: `Invalid Object of: ${req.params.id} ` });
  }
  next();
};
