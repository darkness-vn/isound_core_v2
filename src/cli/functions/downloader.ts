import { Innertube, UniversalCache, Utils } from 'youtubei.js';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { MusicSearchFilters } from 'youtubei.js/dist/src/types';

type DownloaderOptions = {
    type: 'all' | 'song' | 'video' | 'album' | 'playlist' | 'artist' | undefined
}

export default async function downloader(keyword: string, options?: DownloaderOptions) {
    const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
    const search = await yt.music.search(keyword, { type: options?.type ?? "album" });
  
    if (!search.results)
      throw new Error('LOL');
  
    const album = await yt.music.getAlbum(search.results[0].id as string);
  
    if (!album.contents)
      throw new Error('empty');
  
    console.info(`Album "${album.header?.title.toString()}" by ${album.header?.author?.name}`);
  
    for (const song of album.contents) {
      const stream = await yt.download(song.id as string, {
        type: 'audio',
        quality: 'best',
        format: 'mp4'
      });
  
      console.info(`Downloading ${song.title} (${song.id})`);
  
      const dir = `./${album.header?.title.toString()}`;
  
      if (!existsSync(dir)) {
        mkdirSync(dir);
      }
  
      const file = createWriteStream(`${dir}/${song.title?.replace(/\//g, '')}.m4a`);
  
      for await (const chunk of Utils.streamToIterable(stream)) {
        file.write(chunk);
      }
  
      console.info(`${song.id} - OKE!`);
    }
  
    console.info(`Downloaded ${album.header?.song_count}!`);
  }