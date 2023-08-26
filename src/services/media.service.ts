import { Innertube, UniversalCache, Utils } from 'youtubei.js';
import HttpException from '../exceptions/http.exception';
import { Service } from 'typedi';

const location = "VN" //process.env.location
const lang = "vi" //process.env.lang

export async function search(keyword: string) {
    try {
        const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true })
        const query = await yt.music.search(keyword)
        return query
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function getMediaStream(mediaId: string) {
    const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true })
    const info = await mediaService.music.getInfo(mediaId)
    const stream = await mediaService.download(info.basic_info.id as string, {
        type: 'audio',
        quality: 'best',
        format: 'mp4'
    })
    return stream
}

export async function getMediaInfo(mediaId: string) {
    try {
        const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true, location, lang });
        const info = await mediaService.music.getInfo(mediaId)
        await info.addToWatchHistory()
        return info.basic_info
    } catch (error) {
        throw new HttpException(404, `Media is not found`)
    }
}

export async function getHomeData() {
    try {
        const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true, location, lang });
        const home = await mediaService.music.getHomeFeed()
        return home.sections
    } catch (error) {

    }
}

export async function getLyrics(mediaId: string) {
    try {
        const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true, location, lang });
        const lyrics = await mediaService.music.getLyrics(mediaId)
        return lyrics
    } catch (error) {
        throw new HttpException(404, `Không có lời bài hát`)
    }
}


async function mediaService() {

    const core = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true, location, lang })

    const getMediaInfo = async (mediaId: string) => {
        try {
            const info = await core.music.getInfo(mediaId)

            return info.basic_info
        } catch (error) {
            throw new HttpException(404, `Media is not found`)
        }
    }

    const getLyrics = async (mediaId: string) => {
        try {
            const lyrics = await core.music.getLyrics(mediaId)
            return lyrics
        } catch (error) {
            throw new HttpException(404, `Không có lời bài hát`)
        }
    }

    const getRelated = async (mediaId: string) => {
        try {
            const data = await core.music.getRelated(mediaId)
            return data
        } catch (error) {
            throw new HttpException(404, `not found`)
        }
    }

    const getMediaStream = async (mediaId: string) => {
        try {
            const stream = await core.download(mediaId, {
                type: 'audio',
                quality: 'best',
                format: 'mp4'
            })
            return stream
        } catch(error: any) {
            throw new HttpException(404, error.message)
        }
    }

    return {
        getLyrics, 
        getMediaInfo,
        getRelated,
        getMediaStream
    }
}

const useMediaService = mediaService()
export default useMediaService