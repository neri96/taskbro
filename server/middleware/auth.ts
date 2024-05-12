import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authentication as string)?.split(" ")[1];

    const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string);

    res.locals.userData = userData;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid access token" });
  }
};
