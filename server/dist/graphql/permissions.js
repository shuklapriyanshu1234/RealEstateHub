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
const graphql_shield_1 = require("graphql-shield");
const user_1 = __importDefault(require("../services/user"));
const isAuthenticated = (0, graphql_shield_1.rule)()((_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.user)
        return true;
    return false;
}));
const isAdmin = (0, graphql_shield_1.rule)()((_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (!context.user || context.user.role !== "admin")
        return false;
    const user = yield user_1.default.getUserById(context.user._id);
    return user.role === "admin";
}));
const permissions = (0, graphql_shield_1.shield)({
    Query: {
        users: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        notifications: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
    },
    Mutation: {
        updateUser: isAuthenticated,
        addFavorite: isAuthenticated,
        removeFavorite: isAuthenticated,
        changeRole: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        createType: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        updateType: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        deleteType: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        createProvince: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        updateProvince: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        deleteProvince: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        createNotification: isAuthenticated,
        deleteNotification: isAuthenticated,
        createLocation: isAuthenticated,
        updateLocation: isAuthenticated,
        createDistrict: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        updateDistrict: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        deleteDistrict: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        createDetailedType: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        updateDetailedType: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        deleteDetailedType: (0, graphql_shield_1.and)(isAuthenticated, isAdmin),
        createEstate: isAuthenticated,
        updateEstate: isAuthenticated,
        createDetails: isAuthenticated,
        updateDetails: isAuthenticated,
    },
}, {
    debug: true,
    allowExternalErrors: true,
});
exports.default = permissions;
//# sourceMappingURL=permissions.js.map