import { Router } from "express"
import AuthMiddleware from "../../middlewares/auth.middleware"
import Routes from "../../types/routes"
import UserController from "./user.controller"

export default class UserRoute implements Routes {
    public path = '/user'
    public router = Router()
    public controller = new UserController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.put(`${this.path}/info`, AuthMiddleware, this.controller.updateInfo)
        this.router.post(`${this.path}/token/create-api-token`, AuthMiddleware, this.controller.createAPIToken)
        this.router.get(`${this.path}/token`, AuthMiddleware, this.controller.getTokenList)
        this.router.get(`${this.path}/token/:token`, AuthMiddleware, this.controller.getTokenInfo)
        this.router.delete(`${this.path}/token/:token`, AuthMiddleware, this.controller.deleteToken)
        this.router.put(`${this.path}/token/:token`, AuthMiddleware, this.controller.updateTokenInfo)
    }
}
