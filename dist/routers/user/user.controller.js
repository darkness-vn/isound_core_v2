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
const firebase_app_1 = require("../../firebase/firebase.app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenTypes_1 = require("../../constants/tokenTypes");
class UserController {
    constructor() {
        this.updateInfo = (req, res) => {
            return res.status(200).json(req.user);
        };
        this.createAPIToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { tokenName, options } = req.body;
            console.log(options);
            let currentDate = new Date();
            currentDate.setFullYear(currentDate.getFullYear() + 2);
            const tokenOptionsInstance = {
                location: "VN",
                lang: "vi",
                feed: false,
                audio: false,
                video: false,
                download: false,
                lyric: false,
                history: false,
                playlist: false
            };
            const tokenDoc = yield firebase_app_1.store.collection("tokens").add({
                options: Object.assign(Object.assign({}, tokenOptionsInstance), options),
                uid: (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid,
                token_limit: 10000,
                token_name: tokenName,
                token_tags: [tokenTypes_1.TOKENS_TYPES.free]
            });
            const token_content = jsonwebtoken_1.default.sign({ tokenDocId: tokenDoc.id }, "API_TOKEN_SECRET", { expiresIn: "2y" });
            yield tokenDoc.update({
                key: tokenDoc.id,
                token_content,
                token_expires: currentDate
            });
            return res.status(200).json("OK");
        });
        this.getTokenList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const snapshot = yield firebase_app_1.store.collection("tokens").where("uid", "==", (_b = req.user) === null || _b === void 0 ? void 0 : _b.uid);
            const { docs } = yield snapshot.get();
            const data = docs.map((doc) => {
                return (Object.assign(Object.assign({}, doc.data()), { key: doc.id }));
            });
            return res.status(200).json(data);
        });
        this.getTokenInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                const snapshot = yield firebase_app_1.store.collection("tokens").doc(token).get();
                const data = snapshot.data();
                return res.status(200).json(data);
            }
            catch (err) {
            }
        });
        this.deleteToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                yield firebase_app_1.store.collection("tokens").doc(token).delete();
                return res.status(201).json("OK");
            }
            catch (error) {
                return res.status(500);
            }
        });
        this.updateTokenInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.params;
            }
            catch (error) {
            }
        });
    }
}
exports.default = UserController;
