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
const media_service_1 = require("../../services/media.service");
class HomeController {
    getHomePageContent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const homeData = yield (0, media_service_1.getHomeData)();
                if (homeData) {
                    return res.status(200).json(homeData);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = HomeController;
