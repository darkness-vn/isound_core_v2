import { Container } from "typedi"
import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export default class AuthController {
    public service = Container.get(AuthService);
  
    public register = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password, email } = req.body
        const data = await this.service.register({ username, password, email });
  
        res.status(201).json({ data });
      } catch (error) {
        next(error);
      }
    };
    /*
    public logIn = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userData: User = req.body;
        const { cookie, findUser } = await this.auth.login(userData);
  
        res.setHeader('Set-Cookie', [cookie]);
        res.status(200).json({ data: findUser, message: 'login' });
      } catch (error) {
        next(error);
      }
    };
  
    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
      try {
        const userData: User = req.user;
        const logOutUserData: User = await this.auth.logout(userData);
  
        res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
        res.status(200).json({ data: logOutUserData, message: 'logout' });
      } catch (error) {
        next(error);
      }
    };
    */
  }