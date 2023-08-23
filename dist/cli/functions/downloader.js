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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtubei_js_1 = require("youtubei.js");
const fs_1 = require("fs");
function downloader(keyword, options) {
    var _a, e_1, _b, _c;
    var _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        const yt = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true });
        const search = yield yt.music.search(keyword, { type: (_d = options === null || options === void 0 ? void 0 : options.type) !== null && _d !== void 0 ? _d : "album" });
        if (!search.results)
            throw new Error('LOL');
        const album = yield yt.music.getAlbum(search.results[0].id);
        if (!album.contents)
            throw new Error('empty');
        console.info(`Album "${(_e = album.header) === null || _e === void 0 ? void 0 : _e.title.toString()}" by ${(_g = (_f = album.header) === null || _f === void 0 ? void 0 : _f.author) === null || _g === void 0 ? void 0 : _g.name}`);
        for (const song of album.contents) {
            const stream = yield yt.download(song.id, {
                type: 'audio',
                quality: 'best',
                format: 'mp4'
            });
            console.info(`Downloading ${song.title} (${song.id})`);
            const dir = `./${(_h = album.header) === null || _h === void 0 ? void 0 : _h.title.toString()}`;
            if (!(0, fs_1.existsSync)(dir)) {
                (0, fs_1.mkdirSync)(dir);
            }
            const file = (0, fs_1.createWriteStream)(`${dir}/${(_j = song.title) === null || _j === void 0 ? void 0 : _j.replace(/\//g, '')}.m4a`);
            try {
                for (var _l = true, _m = (e_1 = void 0, __asyncValues(youtubei_js_1.Utils.streamToIterable(stream))), _o; _o = yield _m.next(), _a = _o.done, !_a; _l = true) {
                    _c = _o.value;
                    _l = false;
                    const chunk = _c;
                    file.write(chunk);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_l && !_a && (_b = _m.return)) yield _b.call(_m);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.info(`${song.id} - OKE!`);
        }
        console.info(`Downloaded ${(_k = album.header) === null || _k === void 0 ? void 0 : _k.song_count}!`);
    });
}
exports.default = downloader;
