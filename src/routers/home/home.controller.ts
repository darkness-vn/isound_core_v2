import { Request, Response } from "express"
import { getHomeData } from "../../services/media.service"

export default class HomeController {
    public async getHomePageContent(req: Request, res: Response) {
        try {
            const homeData = await getHomeData()
            if (homeData) {
                return res.status(200).json(homeData)
            }
        } catch (err) {
            console.log(err)
        }
    }
}