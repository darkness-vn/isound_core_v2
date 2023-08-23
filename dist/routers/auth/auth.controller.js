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
const typedi_1 = require("typedi");
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this.service = typedi_1.Container.get(auth_service_1.AuthService);
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email } = req.body;
                const data = yield this.service.register({ username, password, email });
                res.status(201).json({ data });
            }
            catch (error) {
                next(error);
            }
        });
        /*
        public logIn = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const userData: User = req.body;
            const { cookie, findUser } = await this.auth.login(userData);
      
            res.setHeader('Set-Cookie', [cookie]);
            res.status(200).json({ data: findUser, message: 'login' });
          } catch (error) {
            next(error);
          }
        };
      
        public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
          try {
            const userData: User = req.user;
            const logOutUserData: User = await this.auth.logout(userData);
      
            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
            res.status(200).json({ data: logOutUserData, message: 'logout' });
          } catch (error) {
            next(error);
          }
        };
        */
    }
}
exports.default = AuthController;
