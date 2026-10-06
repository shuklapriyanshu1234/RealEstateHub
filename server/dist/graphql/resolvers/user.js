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
const auth_1 = __importDefault(require("../../services/auth"));
const user_1 = __importDefault(require("../../services/user"));
exports.default = {
    Query: {
        user(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield user_1.default.getUserById(args._id);
                return user;
            });
        },
        users(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const users = yield user_1.default.getUsers(args.limit, args.offset);
                return users;
            });
        },
        favorites(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const favorites = yield user_1.default.getFavorites(args._id, args.limit, args.offset);
                return favorites;
            });
        },
        reauthenticate(_, args, { req, res }) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldRefreshToken = req.cookies["refresh-token"];
                const { refreshToken, accessToken, user } = yield auth_1.default.reauthenticate(oldRefreshToken);
                if (refreshToken && accessToken && user) {
                    res.cookie("access-token", accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 30,
                        sameSite: "None",
                    });
                    res.cookie("refresh-token", refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        sameSite: "None",
                    });
                    res.cookie("user", JSON.stringify(user), {
                        httpOnly: false,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 1000 * 60 * 30,
                        sameSite: "None",
                    });
                    yield user_1.default.updateUser({
                        _id: user._id,
                        refreshToken,
                    });
                    return true;
                }
                return false;
            });
        },
    },
    Mutation: {
        register(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield auth_1.default.register(args);
                return user;
            });
        },
        login(_, args, { res }) {
            return __awaiter(this, void 0, void 0, function* () {
                const { accessToken, refreshToken } = yield auth_1.default.login(args);
                res.cookie("access-token", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 30,
                    sameSite: "None",
                });
                res.cookie("refresh-token", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "None",
                });
                return accessToken;
            });
        },
        logout(_, args, { res }) {
            return __awaiter(this, void 0, void 0, function* () {
                yield auth_1.default.logout(args._id);
                res.clearCookie("user");
                res.clearCookie("access-token");
                res.clearCookie("refresh-token");
                return true;
            });
        },
        updateUser(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield user_1.default.updateUser(args);
                return user;
            });
        },
        addFavorite(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield user_1.default.addFavorite(args);
                return user;
            });
        },
        removeFavorite(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield user_1.default.removeFavorite(args);
                return user;
            });
        },
        changeRole(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield user_1.default.changeRole(args);
                return user;
            });
        },
    },
};
//# sourceMappingURL=user.js.map