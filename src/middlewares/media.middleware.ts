import { Request, Response, NextFunction } from "express"
import HttpException from "../exceptions/http.exception"
import jwt from "jsonwebtoken"
import { TokenAPIJwtPayload } from "../types/tokenApi"
import { store } from "../firebase/firebase.app"
import { TOKENS_TYPES } from "../constants/tokenTypes"

export default async function MediaMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.query
        const decoded = jwt.verify(token as string, "API_TOKEN_SECRET") as TokenAPIJwtPayload
        
        if (decoded) {
            const tokenDoc = await store.collection("tokens").doc(decoded.tokenDocId)
            
            const tokenData = (await tokenDoc.get()).data()

            if (tokenData?.token_limit <= 0) {
                await tokenDoc.update({ token_tags: [TOKENS_TYPES.expired] })
                return next(new HttpException(403, 'Your token has reached the request limit'))
            }

            await tokenDoc.update({ token_limit: tokenData?.token_limit - 1 })

            return next()
        } else {
            return next(new HttpException(401, 'apiToken is not valid'))
        }
    } catch (error) {
        return next(new HttpException(401, 'apiToken is not valid'))
    }
}