import { Innertube, UniversalCache, Utils } from 'youtubei.js';
import { existsSync, mkdirSync, createWriteStream, writeFile } from 'fs';
import { MusicSearchFilters } from 'youtubei.js/dist/src/types';

export default async function audioDownloader(audioId: string) {
    const mediaService = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });

    const info = await mediaService.music.getInfo(audioId)


    const stream = await mediaService.download(info.basic_info.id as string, {
        type: 'audio',
        quality: 'best',
        format: 'mp4'
    })

    return stream

    // const dir = `./audio`;

    // if (!existsSync(dir)) {
    //     mkdirSync(dir);
    // }

    // const file = createWriteStream(`${dir}/${info.basic_info.title?.replace(/\//g, '')}.m4a`);

    // for await (const chunk of Utils.streamToIterable(stream)) {
    //     file.write(chunk);
    // }
}