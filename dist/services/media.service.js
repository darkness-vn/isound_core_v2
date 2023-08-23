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
exports.getHomeData = exports.getMediaInfo = exports.getMediaStream = exports.search = void 0;
const youtubei_js_1 = require("youtubei.js");
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const location = process.env.location;
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
        const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true, location });
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
            const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true, location });
            const info = yield mediaService.music.getInfo(mediaId);
            return info;
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
            const mediaService = yield youtubei_js_1.Innertube.create({ cache: new youtubei_js_1.UniversalCache(false), generate_session_locally: true, location });
            const home = yield mediaService.music.getHomeFeed();
            return home.sections;
        }
        catch (error) {
        }
    });
}
exports.getHomeData = getHomeData;
