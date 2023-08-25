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
const firebase_app_1 = require("../firebase/firebase.app");
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idToken = req.header("Authorization") || req.body.idToken;
    if (!idToken) {
        return next(new http_exception_1.default(404, 'accessToken and idToken must be provided'));
    }
    try {
        const userPayload = yield firebase_app_1.auth.verifyIdToken(idToken);
        req.user = userPayload;
        return next();
    }
    catch (error) {
        console.log(error);
        return next(new http_exception_1.default(401, 'Can not authenticate'));
    }
});
exports.default = AuthMiddleware;
