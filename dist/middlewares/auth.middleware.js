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
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const getAuthorization = (req) => {
    const coockie = req.cookies['Authorization'];
    if (coockie)
        return coockie;
    const header = req.header('Authorization');
    if (header)
        return header.split('Bearer ')[1];
    return null;
};
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Authorization = getAuthorization(req);
        if (Authorization) {
            const { _id } = (yield (0, jsonwebtoken_1.verify)(Authorization, "SECRET_KEY"));
            // const user = await User.findById(_id);
            // if (user) {
            //   req.user = user;
            //   next();
            // } else {
            //   next(new HttpException(401, 'Wrong authentication token'));
            // }
        }
        else {
            next(new http_exception_1.default(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new http_exception_1.default(401, 'Wrong authentication token'));
    }
});
exports.AuthMiddleware = AuthMiddleware;
