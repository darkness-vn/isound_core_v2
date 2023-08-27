import { store } from "../../firebase/firebase.app";
import { RequestWithUser } from "../../types/auth";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid"

import jwt from "jsonwebtoken"
import { TOKENS_TYPES } from "../../constants/tokenTypes";

export default class UserController {
    public updateInfo = (req: RequestWithUser, res: Response) => {

        return res.status(200).json(req.user)
    }

    public createAPIToken = async (req: RequestWithUser, res: Response) => {

        const { tokenName, options } = req.body

        console.log(options)

        let currentDate = new Date()
        currentDate.setFullYear(currentDate.getFullYear() + 2)

        const tokenOptionsInstance = {
            location: "VN",
            lang: "vi",
            feed: false,
            audio: false,
            video: false,
            download: false,
            lyric: false,
            history: false,
            playlist: false
        }

        const tokenDoc = await store.collection("tokens").add({
            options: {
                ...tokenOptionsInstance,
                ...options
            },
            uid: req.user?.uid, 
            token_limit: 10000, 
            token_name: tokenName, 
            token_tags: [TOKENS_TYPES.free]
        })

        const token_content = jwt.sign(
            { tokenDocId: tokenDoc.id },
            "API_TOKEN_SECRET",
            { expiresIn: "2y" }
        )
        await tokenDoc.update({
            key: tokenDoc.id, 
            token_content, 
            token_expires: currentDate })

        return res.status(200).json("OK")
    }

    public getTokenList = async (req: RequestWithUser, res: Response) => {
        const snapshot = await store.collection("tokens").where("uid", "==", req.user?.uid)
        const { docs } = await snapshot.get()

        const data = docs.map((doc) => {
            return ({ ...doc.data(), key: doc.id })
        })

        return res.status(200).json(data)
    }

    public getTokenInfo = async (req: RequestWithUser, res: Response) => {
        const { token } = req.params
        try {
            const snapshot = await store.collection("tokens").doc(token).get()
            const data = snapshot.data()
            return res.status(200).json(data)
        } catch (err) {

        }
    }

    public deleteToken = async (req: RequestWithUser, res: Response) => {
        const { token } = req.params

        try {
            await store.collection("tokens").doc(token).delete()
            return res.status(201).json("OK")
        } catch (error) {

            return res.status(500)

        }
    }

    public updateTokenInfo = async (req: RequestWithUser, res: Response) => {
        try {
            const { token } = req.params
        } catch (error) {

        }
    }
}
