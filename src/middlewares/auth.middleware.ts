import { Response, NextFunction } from "express";
import { DataStoredInToken, RequestWithUser } from "../types/auth";
import { verify } from 'jsonwebtoken'
import HttpException from "../exceptions/http.exception";

const getAuthorization = (req: RequestWithUser) => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
}

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = getAuthorization(req);
  
      if (Authorization) {
        const { _id } = (await verify(Authorization, "SECRET_KEY")) as DataStoredInToken;
        // const user = await User.findById(_id);
  
        // if (user) {
        //   req.user = user;
        //   next();
        // } else {
        //   next(new HttpException(401, 'Wrong authentication token'));
        // }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };