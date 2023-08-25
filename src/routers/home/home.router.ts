import { Router } from "express"
import Routes from "../../types/routes";
import HomeController from "./home.controller";
import MediaMiddleware from "../../middlewares/media.middleware";

export default class HomeRoute implements Routes {
    public path = '/'
    public router = Router()
    public controller = new HomeController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, MediaMiddleware, this.controller.getHomePageContent);
    }
}