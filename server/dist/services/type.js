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
const Type_1 = __importDefault(require("../models/Type"));
class TypeService {
    static getType(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield Type_1.default.findById(_id);
            return type;
        });
    }
    static getTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const types = yield Type_1.default.find({});
            return types;
        });
    }
    static createType(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield Type_1.default.create(params);
            return type;
        });
    }
    static updateType(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield Type_1.default.findByIdAndUpdate(params._id, params, {
                new: true,
            });
            return type;
        });
    }
    static deleteType(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield Type_1.default.findByIdAndDelete(_id);
            return type;
        });
    }
}
exports.default = TypeService;
//# sourceMappingURL=type.js.map