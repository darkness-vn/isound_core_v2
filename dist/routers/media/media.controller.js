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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const youtubei_js_1 = require("youtubei.js");
const media_service_1 = __importDefault(require("../../services/media.service"));
const reader = new stream_1.Readable();
class MediaController {
    download(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            reader.pipe(res);
        });
    }
    play(req, res) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mediaId } = req.params;
                const stream = yield (yield media_service_1.default).getMediaStream(mediaId);
                res.setHeader('Content-Type', 'application/octet-stream');
                try {
                    for (var _d = true, _e = __asyncValues(youtubei_js_1.Utils.streamToIterable(stream)), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                        _c = _f.value;
                        _d = false;
                        const chunk = _c;
                        res.write(chunk);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                res.end();
            }
            catch (error) {
                return res.status(404).json(error.message);
            }
        });
    }
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mediaId } = req.params;
                const info = yield (yield media_service_1.default).getMediaInfo(mediaId);
                return res.status(200).json(info);
            }
            catch (err) {
                res.status(404).json(err.message);
            }
        });
    }
    getLyric(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mediaId } = req.params;
            try {
                const lyric = yield (yield media_service_1.default).getLyrics(mediaId);
                if (lyric) {
                    return res.status(200).json(lyric);
                }
                else {
                    return res.status(404).json("Ko co loi");
                }
            }
            catch (error) {
                // @ts-ignore
                return res.status(404).json(error.message);
            }
        });
    }
    getRelated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mediaId } = req.params;
                const data = yield (yield media_service_1.default).getRelated(mediaId);
                return res.status(200).json(data);
            }
            catch (error) {
                return res.status(404);
            }
        });
    }
}
exports.default = MediaController;
