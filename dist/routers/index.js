"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRoute = exports.MediaRoute = exports.AuthRoute = void 0;
var auth_route_1 = require("./auth/auth.route");
Object.defineProperty(exports, "AuthRoute", { enumerable: true, get: function () { return __importDefault(auth_route_1).default; } });
var media_route_1 = require("./media/media.route");
Object.defineProperty(exports, "MediaRoute", { enumerable: true, get: function () { return __importDefault(media_route_1).default; } });
var home_router_1 = require("./home/home.router");
Object.defineProperty(exports, "HomeRoute", { enumerable: true, get: function () { return __importDefault(home_router_1).default; } });
