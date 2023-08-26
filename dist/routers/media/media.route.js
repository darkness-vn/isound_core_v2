"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_controller_1 = __importDefault(require("./media.controller"));
const media_middleware_1 = __importDefault(require("../../middlewares/media.middleware"));
class MediaRoute {
    constructor() {
        this.path = '/media';
        this.router = (0, express_1.Router)();
        this.controller = new media_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/play/:mediaId`, media_middleware_1.default, this.controller.play);
        this.router.get(`${this.path}/info/:mediaId`, media_middleware_1.default, this.controller.getInfo);
        this.router.get(`${this.path}/lyric/:mediaId`, media_middleware_1.default, this.controller.getLyric);
        this.router.get(`${this.path}/related/:mediaId`, media_middleware_1.default, this.controller.getRelated);
    }
}
exports.default = MediaRoute;
