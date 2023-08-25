"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.store = exports.app = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_config_json_1 = __importDefault(require("./firebase.config.json"));
exports.app = firebase_admin_1.default.initializeApp({
    // @ts-ignore
    credential: firebase_admin_1.default.credential.cert(firebase_config_json_1.default)
});
exports.store = exports.app.firestore();
exports.auth = exports.app.auth();
