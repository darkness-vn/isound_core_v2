"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const user_controller_1 = __importDefault(require("./user.controller"));
class UserRoute {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.put(`${this.path}/info`, auth_middleware_1.default, this.controller.updateInfo);
        this.router.post(`${this.path}/token/create-api-token`, auth_middleware_1.default, this.controller.createAPIToken);
        this.router.get(`${this.path}/token`, auth_middleware_1.default, this.controller.getTokenList);
        this.router.get(`${this.path}/token/:token`, auth_middleware_1.default, this.controller.getTokenInfo);
        this.router.delete(`${this.path}/token/:token`, auth_middleware_1.default, this.controller.deleteToken);
        this.router.put(`${this.path}/token/:token`, auth_middleware_1.default, this.controller.updateTokenInfo);
    }
}
exports.default = UserRoute;
