import type { Response, Request } from "express"
import { search } from "../../services/media.service"

import { Router } from "express"
import { AuthMiddleware } from "../../middlewares/auth.middleware"
import Routes from "../../types/routes"
import MediaController from "./media.controller"

export default class MediaRoute implements Routes {
    public path = '/media'
    public router = Router()
    public controller = new MediaController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/play/:mediaId`, this.controller.play)
        this.router.get(`${this.path}/info/:mediaId`, this.controller.getInfo)
    }
}
