import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import Routes from "../../types/routes";
import AuthController from "./auth.controller";

export default class AuthRoute implements Routes {
    public path = '/';
    public router = Router();
    public controller = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}register`, this.controller.register);
        // this.router.post(`${this.path}login`, this.auth.logIn);
        // this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
    }
}