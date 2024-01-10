import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authentication as string)?.split(" ")[1];

    const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY as string);
    console.log(userData);

    res.locals.userData = userData;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ error: "Invalid access token" });
  }
};
