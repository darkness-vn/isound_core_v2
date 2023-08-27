import { Request, Response } from "express"
import { store } from "../../firebase/firebase.app"

class TokenController {
    public getTokenData = async (req: Request, res: Response) => {
        try {
            const { tokenId } = req.params
            const snapshot = await store.collection("tokens").doc(tokenId).get()
            const data = snapshot.data()

            return res.status(200).json(data)
        } catch(err) {
            console.log(err)
        }
    }

    public updateToken = async (req: Request, res: Response) => {
        try {
            const { options } = req.body
            const { tokenId } = req.params
            const snapshot = await store.collection("tokens").doc(tokenId)
            const data = (await snapshot.get()).data()

            const currentOptions = data?.options

            await snapshot.update({
                options: { ...currentOptions, ...options }
            })

            return res.status(200).json("Ok")
        } catch(error) {

        }
    }
}

export default TokenController