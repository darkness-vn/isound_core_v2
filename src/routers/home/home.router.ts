import { Router } from "express"
import Routes from "../../types/routes";
import HomeController from "./home.controller";

export default class HomeRoute implements Routes {
    public path = '/'
    public router = Router()
    public controller = new HomeController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.controller.getHomePageContent);
    }
}