"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
class AuthRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.controller = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}register`, this.controller.register);
        // this.router.post(`${this.path}login`, this.auth.logIn);
        // this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
    }
}
exports.default = AuthRoute;
