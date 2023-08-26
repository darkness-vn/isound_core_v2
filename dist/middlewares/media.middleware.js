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
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebase_app_1 = require("../firebase/firebase.app");
const tokenTypes_1 = require("../constants/tokenTypes");
function MediaMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`:: MediaMiddleware ::`);
        const ENV = process.env.env;
        if (ENV == "dev")
            return next();
        try {
            const { token } = req.query;
            const decoded = jsonwebtoken_1.default.verify(token, "API_TOKEN_SECRET");
            if (ENV === "dev") {
                return next();
            }
            if (decoded) {
                const tokenDoc = yield firebase_app_1.store.collection("tokens").doc(decoded.tokenDocId);
                const tokenData = (yield tokenDoc.get()).data();
                if ((tokenData === null || tokenData === void 0 ? void 0 : tokenData.token_limit) <= 0) {
                    yield tokenDoc.update({ token_tags: [tokenTypes_1.TOKENS_TYPES.expired] });
                    return next(new http_exception_1.default(403, 'Your token has reached the request limit'));
                }
                yield tokenDoc.update({ token_limit: (tokenData === null || tokenData === void 0 ? void 0 : tokenData.token_limit) - 1 });
                return next();
            }
            else {
                return next(new http_exception_1.default(401, 'apiToken is not valid'));
            }
        }
        catch (error) {
            return next(new http_exception_1.default(401, 'apiToken is not valid'));
        }
    });
}
exports.default = MediaMiddleware;
