import { Innertube, UniversalCache, Utils } from 'youtubei.js';
import HttpException from '../exceptions/http.exception';

const location = "VN" //process.env.location
const lang = "vi"

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
    const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true, location })
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
        const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true, location });
        const info = await mediaService.music.getInfo(mediaId)
        return info
    } catch(error) {
        throw new HttpException(404, `Media is not found`)
    }
}

export async function getHomeData() {
    try {
        const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true, location });
        const home = await mediaService.music.getHomeFeed()
        return home.sections
    } catch (error) {
        
    }
}