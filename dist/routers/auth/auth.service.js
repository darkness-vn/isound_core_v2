"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const typedi_1 = require("typedi");
const http_exception_1 = __importDefault(require("../../exceptions/http.exception"));
const firebase_app_1 = require("../../firebase/firebase.app");
const createToken = (userID) => {
    const dataStoredInToken = { _id: userID };
    const expiresIn = 60 * 60;
    return { expiresIn, token: (0, jsonwebtoken_1.sign)(dataStoredInToken, "SECRET_KEY", { expiresIn }) };
};
const createCookie = (tokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
let AuthService = exports.AuthService = class AuthService {
    register({ username, password, email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
            const snapshot = yield firebase_app_1.store.collection("users").where("email", "==", email).get();
            if (snapshot.empty) {
                console.log('No matching, can register');
                const newUser = yield firebase_app_1.store.collection("users").add({ username, password: hashedPassword, email });
                console.log(newUser.id);
                const token = createToken(newUser.id);
                const cookie = createCookie(token);
                return { cookie, newUser };
            }
            else {
                console.log('Can not register');
                throw new http_exception_1.default(409, `This email ${email} already exists`);
            }
        });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, typedi_1.Service)()
], AuthService);
