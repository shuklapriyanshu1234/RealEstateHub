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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const graphql_1 = require("graphql");
const user_1 = __importDefault(require("./user"));
const User_1 = __importDefault(require("../models/User"));
class AuthService {
    static register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = params;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const isExist = yield user_1.default.getUserByEmail(email);
            if (isExist)
                throw new graphql_1.GraphQLError("This email is already in use.");
            const user = yield User_1.default.create(Object.assign(Object.assign({}, params), { password: hashedPassword }));
            return user;
        });
    }
    static login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = params;
            const user = yield user_1.default.getUserByEmail(email);
            if (!user)
                throw new graphql_1.GraphQLError("Wrong email or password.");
            if (user.role === "banned")
                throw new graphql_1.GraphQLError("Your account has been banned.");
            const isSame = yield bcrypt_1.default.compare(password, user.password);
            if (!isSame)
                throw new graphql_1.GraphQLError("Wrong email or password.");
            const accessToken = yield AuthService.generateAccessToken({
                _id: user._id,
                role: user.role,
            });
            const refreshToken = yield AuthService.generateRefreshToken({
                _id: user._id,
                role: user.role,
            });
            yield user_1.default.updateUser({ _id: user._id, refreshToken });
            return { accessToken, refreshToken };
        });
    }
    static logout(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.updateUser({ _id, refreshToken: "" });
        });
    }
    static reauthenticate(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user, newRefreshToken, newAccessToken;
                const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                const { _id, role } = decoded;
                const isSame = yield AuthService.checkRefreshToken(_id, refreshToken);
                if (isSame) {
                    user = { _id, role };
                    newAccessToken = yield AuthService.generateAccessToken({
                        _id,
                        role,
                    });
                    newRefreshToken = yield AuthService.generateRefreshToken({
                        _id,
                        role,
                    });
                }
                return {
                    user,
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                };
            }
            catch (_a) {
                return {
                    user: null,
                    refreshToken: null,
                    accessToken: null,
                };
            }
        });
    }
    static checkRefreshToken(_id, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.getUserById(_id);
            return user.refreshToken === refreshToken;
        });
    }
    static generateAccessToken(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign(params, process.env.JWT_ACCESS_SECRET, {
                expiresIn: "30m",
            });
            return token;
        });
    }
    static generateRefreshToken(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign(params, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "30 days",
            });
            return token;
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.js.map