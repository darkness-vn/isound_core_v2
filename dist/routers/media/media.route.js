"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_controller_1 = __importDefault(require("./media.controller"));
class MediaRoute {
    constructor() {
        this.path = '/media';
        this.router = (0, express_1.Router)();
        this.controller = new media_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/play/:mediaId`, this.controller.play);
        this.router.get(`${this.path}/info/:mediaId`, this.controller.getInfo);
    }
}
exports.default = MediaRoute;