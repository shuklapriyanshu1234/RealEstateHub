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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    let user = null;
    let accessToken = req.headers.authorization || req.cookies["access-token"];
    if (accessToken && accessToken.startsWith("Bearer ")) {
        accessToken = accessToken.slice("Bearer ".length).trim();
    }
    if (accessToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            user = { _id: decoded._id, role: decoded.role };
        }
        catch (error) {
            user = null;
        }
    }
    if (!accessToken)
        res.clearCookie("user");
    return {
        user,
        req,
        res,
    };
});
//# sourceMappingURL=context.js.map