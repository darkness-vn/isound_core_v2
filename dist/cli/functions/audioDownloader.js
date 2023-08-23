"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtubei_js_1 = require("youtubei.js");
function audioDownloader(audioId) {
    return __awaiter(this, void 0, void 0, function* () {
        const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true });
        const info = yield mediaService.music.getInfo(audioId);
        const stream = yield mediaService.download(info.basic_info.id, {
            type: 'audio',
            quality: 'best',
            format: 'mp4'
        });
        return stream;
        // const dir = `./audio`;
        // if (!existsSync(dir)) {
        //     mkdirSync(dir);
        // }
        // const file = createWriteStream(`${dir}/${info.basic_info.title?.replace(/\//g, '')}.m4a`);
        // for await (const chunk of Utils.streamToIterable(stream)) {
        //     file.write(chunk);
        // }
    });
}
exports.default = audioDownloader;
