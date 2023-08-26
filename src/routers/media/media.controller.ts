import { Readable } from "stream"
import audioDownloader from "../../cli/functions/audioDownloader"
import Innertube, { Utils } from 'youtubei.js'
import useMediaService, { getMediaStream, getMediaInfo, getLyrics } from "../../services/media.service"

const reader = new Readable()

import { Container } from "typedi"
import type { Request, Response, NextFunction } from "express"
import HttpException from "../../exceptions/http.exception"

export default class MediaController {

    public async download(req: Request, res: Response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        reader.pipe(res);
    }

    public async play(req: Request, res: Response) {
        try {
            const { mediaId } = req.params

            const stream = await (await useMediaService).getMediaStream(mediaId)
            res.setHeader('Content-Type', 'application/octet-stream')
            for await (const chunk of Utils.streamToIterable(stream)) {
                res.write(chunk)
            }
            res.end()
        }
        catch (error: any) {
            return res.status(404).json(error.message)
        }
    }

    public async getInfo(req: Request, res: Response) {
        try {
            const { mediaId } = req.params
            const info = await (await useMediaService).getMediaInfo(mediaId)
            return res.status(200).json(info)
        } catch(err: any) {
            res.status(404).json(err.message)
        }
    }

    public async getLyric(req: Request, res: Response) {
        const { mediaId } = req.params
        try {
            const lyric = await (await useMediaService).getLyrics(mediaId)
            if (lyric) {
                return res.status(200).json(lyric)
            } else {
                return res.status(404).json("Ko co loi")
            }
        } catch(error) {
            // @ts-ignore
            return res.status(404).json(error.message)
        }
    }

    public async getRelated(req: Request, res: Response) {
        try {
            const { mediaId } = req.params
            const data = await (await useMediaService).getRelated(mediaId)
            return res.status(200).json(data)
        } catch(error: any) {
            return res.status(404)
        }
    }
}