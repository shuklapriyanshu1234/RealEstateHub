import { Request, Response } from "express";
import jwt from "jsonwebtoken";

type User = {
  _id: string;
  role: string;
};

type Token = {
  _id: string;
  role: string;
  iat: number;
  exp: number;
};

export default async ({ req, res }: { req: Request; res: Response }) => {
  let user: User = null;

  let accessToken =
    req.headers.authorization || req.cookies["access-token"];

  if (accessToken && accessToken.startsWith("Bearer ")) {
    accessToken = accessToken.slice("Bearer ".length).trim();
  }

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as Token;

      user = { _id: decoded._id, role: decoded.role };
    } catch (error) {
      user = null;
    }
  }

  if (!accessToken) res.clearCookie("user");

  return {
    user,
    req,
    res,
  };
};
