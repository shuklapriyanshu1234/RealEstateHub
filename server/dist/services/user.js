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
const User_1 = __importDefault(require("../models/User"));
class UserService {
    static getUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(_id).populate([
                {
                    path: "favorites",
                    populate: [
                        {
                            path: "location",
                            populate: [{ path: "province" }, { path: "district" }],
                        },
                        { path: "details" },
                        { path: "type" },
                        { path: "detailedType" },
                        { path: "seller" },
                    ],
                },
            ]);
            return user;
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({ email });
            return user;
        });
    }
    static getUsers(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find({})
                .populate("favorites")
                .limit(limit)
                .skip(offset);
            return users;
        });
    }
    static getUsersByFavorite(estateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find({ favorites: estateId });
            return users;
        });
    }
    static getFavorites(_id, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(_id)
                .select("favorites")
                .populate([
                {
                    path: "favorites",
                    populate: [
                        {
                            path: "location",
                            populate: [{ path: "province" }, { path: "district" }],
                        },
                        { path: "details" },
                        { path: "type" },
                        { path: "detailedType" },
                        { path: "seller" },
                    ],
                },
            ])
                .limit(limit)
                .skip(offset);
            return (user === null || user === void 0 ? void 0 : user.favorites) ? user === null || user === void 0 ? void 0 : user.favorites : [];
        });
    }
    static updateUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByIdAndUpdate(params._id, params, {
                new: true,
            });
            return user;
        });
    }
    static addFavorite(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByIdAndUpdate(params._id, {
                $push: { favorites: params.estateId },
            }, { new: true }).populate("favorites");
            return user;
        });
    }
    static removeFavorite(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByIdAndUpdate(params._id, {
                $pull: { favorites: params.estateId },
            }, { new: true }).populate("favorites");
            return user;
        });
    }
    static changeRole(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByIdAndUpdate(params._id, { role: params.role }, { new: true });
            return user;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.js.map