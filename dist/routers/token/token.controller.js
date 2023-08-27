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
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_app_1 = require("../../firebase/firebase.app");
class TokenController {
    constructor() {
        this.getTokenData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { tokenId } = req.params;
                const snapshot = yield firebase_app_1.store.collection("tokens").doc(tokenId).get();
                const data = snapshot.data();
                return res.status(200).json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
        this.updateToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { options } = req.body;
                const { tokenId } = req.params;
                const snapshot = yield firebase_app_1.store.collection("tokens").doc(tokenId);
                const data = (yield snapshot.get()).data();
                const currentOptions = data === null || data === void 0 ? void 0 : data.options;
                yield snapshot.update({
                    options: Object.assign(Object.assign({}, currentOptions), options)
                });
                return res.status(200).json("Ok");
            }
            catch (error) {
            }
        });
    }
}
exports.default = TokenController;
