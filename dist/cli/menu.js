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
const readline_sync_1 = __importDefault(require("readline-sync"));
const downloader_1 = __importDefault(require("./functions/downloader"));
function menu() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[1] Download music`);
        console.log(`[2] Music player...`);
        while (true) {
            let action = readline_sync_1.default.question("Action: ");
            if (action == "1") {
                let keyword = readline_sync_1.default.question("Keyword: ");
                yield (0, downloader_1.default)(keyword);
            }
            if (action == "2") {
                // await musicplayer()
            }
        }
    });
}
exports.default = menu;
