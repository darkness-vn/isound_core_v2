import { Router } from "express"
import Routes from "../../types/routes"
import TokenController from "./token.controller"
import AuthMiddleware from "../../middlewares/auth.middleware"

export default class TokenRoute implements Routes {
    public path = "/token"
    public router = Router()
    public controller = new TokenController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:tokenId`, this.controller.getTokenData)
        this.router.put(`${this.path}/:tokenId`, AuthMiddleware, this.controller.updateToken)
    }
}