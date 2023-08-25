import type { Response, Request } from "express"
import { search } from "../../services/media.service"

import { Router } from "express"
import Routes from "../../types/routes"
import MediaController from "./media.controller"
import MediaMiddleware from "../../middlewares/media.middleware"

export default class MediaRoute implements Routes {
    public path = '/media'
    public router = Router()
    public controller = new MediaController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/play/:mediaId`, MediaMiddleware, this.controller.play)
        this.router.get(`${this.path}/info/:mediaId`, MediaMiddleware, this.controller.getInfo)
    }
}
