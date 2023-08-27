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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLyrics = exports.getHomeData = exports.getMediaInfo = exports.getMediaStream = exports.search = void 0;
const youtubei_js_1 = require("youtubei.js");
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const location = "VN"; //process.env.location
const lang = "vi"; //process.env.lang
function search(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const yt = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true });
            const query = yield yt.music.search(keyword);
            return query;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    });
}
exports.search = search;
function getMediaStream(mediaId) {
    return __awaiter(this, void 0, void 0, function* () {
        const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true });
        const info = yield mediaService.music.getInfo(mediaId);
        const stream = yield mediaService.download(info.basic_info.id, {
            type: 'audio',
            quality: 'best',
            format: 'mp4'
        });
        return stream;
    });
}
exports.getMediaStream = getMediaStream;
function getMediaInfo(mediaId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true, location, lang });
            const info = yield mediaService.music.getInfo(mediaId);
            yield info.addToWatchHistory();
            return info.basic_info;
        }
        catch (error) {
            throw new http_exception_1.default(404, `Media is not found`);
        }
    });
}
exports.getMediaInfo = getMediaInfo;
function getHomeData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true, location, lang });
            const home = yield mediaService.music.getHomeFeed();
            return home.sections;
        }
        catch (error) {
        }
    });
}
exports.getHomeData = getHomeData;
function getLyrics(mediaId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true, location, lang });
            const lyrics = yield mediaService.music.getLyrics(mediaId);
            return lyrics;
        }
        catch (error) {
            throw new http_exception_1.default(404, `Không có lời bài hát`);
        }
    });
}
exports.getLyrics = getLyrics;
function mediaService() {
    return __awaiter(this, void 0, void 0, function* () {
        const core = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true, location, lang });
        const getMediaInfo = (mediaId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield core.music.getInfo(mediaId);
                return info.basic_info;
            }
            catch (error) {
                throw new http_exception_1.default(404, `Media is not found`);
            }
        });
        const getLyrics = (mediaId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lyrics = yield core.music.getLyrics(mediaId);
                return lyrics;
            }
            catch (error) {
                throw new http_exception_1.default(404, `Không có lời bài hát`);
            }
        });
        const getRelated = (mediaId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield core.music.getRelated(mediaId);
                return data;
            }
            catch (error) {
                throw new http_exception_1.default(404, `not found`);
            }
        });
        const getMediaStream = (mediaId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const stream = yield core.download(mediaId, {
                    type: 'audio',
                    quality: 'best',
                    format: 'mp4'
                });
                return stream;
            }
            catch (error) {
                throw new http_exception_1.default(404, error.message);
            }
        });
        return {
            getLyrics,
            getMediaInfo,
            getRelated,
            getMediaStream
        };
    });
}
const useMediaService = mediaService();
exports.default = useMediaService;
