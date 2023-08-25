"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const home_controller_1 = __importDefault(require("./home.controller"));
const media_middleware_1 = __importDefault(require("../../middlewares/media.middleware"));
class HomeRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.controller = new home_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, media_middleware_1.default, this.controller.getHomePageContent);
    }
}
exports.default = HomeRoute;
