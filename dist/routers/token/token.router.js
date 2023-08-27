"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_controller_1 = __importDefault(require("./token.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
class TokenRoute {
    constructor() {
        this.path = "/token";
        this.router = (0, express_1.Router)();
        this.controller = new token_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:tokenId`, this.controller.getTokenData);
        this.router.put(`${this.path}/:tokenId`, auth_middleware_1.default, this.controller.updateToken);
    }
}
exports.default = TokenRoute;
