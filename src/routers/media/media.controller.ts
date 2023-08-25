import { Readable } from "stream"
import audioDownloader from "../../cli/functions/audioDownloader"
import { Utils } from 'youtubei.js'
import { getMediaStream, getMediaInfo } from "../../services/media.service"

const reader = new Readable()

import { Container } from "typedi"
import type { Request, Response, NextFunction } from "express"
import HttpException from "../../exceptions/http.exception"

export default class MediaController {
    // public service = Container.get(AuthService);

    public async download(req: Request, res: Response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        reader.pipe(res);
    }

    public async play(req: Request, res: Response) {
        try {
            const { mediaId } = req.params

            const stream = await getMediaStream(mediaId)
            res.setHeader('Content-Type', 'application/octet-stream')
            for await (const chunk of Utils.streamToIterable(stream)) {
                res.write(chunk)
            }
            res.end()
        }
        catch (err) {
            throw new HttpException(500, "Loi roi ban oi")
        }
    }

    public async getInfo(req: Request, res: Response) {
        try {
            const { mediaId } = req.params
            const info = await getMediaInfo(mediaId)
            return res.status(200).json(info.basic_info)
        } catch(err) {
            throw new HttpException(500, "Loi roi ban oi")
        }
    }
}