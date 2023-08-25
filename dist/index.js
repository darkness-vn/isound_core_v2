"use strict";
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
dotenv_1.default.config();
function main() {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    const routes = [
        new routers_1.HomeRoute(),
        new routers_1.AuthRoute(),
        new routers_1.MediaRoute(),
        new routers_1.UserRoute()
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
}
main();
