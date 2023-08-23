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
exports.example = exports.store = exports.app = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_config_json_1 = __importDefault(require("./firebase.config.json"));
exports.app = firebase_admin_1.default.initializeApp({
    // @ts-ignore
    credential: firebase_admin_1.default.credential.cert(firebase_config_json_1.default)
});
exports.store = exports.app.firestore();
function example() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield exports.store.collection("users").add({
            email: "tungdz@gmail.com",
            username: "nhucc"
        });
    });
}
exports.example = example;
