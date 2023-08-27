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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routers_1 = require("./routers");
const location = "VN"; //process.env.location
const lang = "vi"; //process.env.lang
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const app = (0, express_1.default)();
        const server = http_1.default.createServer(app);
        const routes = [
            new routers_1.HomeRoute(),
            new routers_1.AuthRoute(),
            new routers_1.MediaRoute(),
            new routers_1.UserRoute(),
            new routers_1.TokenRoute()
        ];
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        routes.forEach(route => {
            app.use('/', route.router);
        });
        server.listen(8888, () => {
            console.log(`server is running on port 8888`);
        });
    });
}
main();
