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
const DetailedType_1 = __importDefault(require("../models/DetailedType"));
class DetailedTypeServices {
    static getDetailedType(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const detailedType = yield DetailedType_1.default.findById(_id).populate("parent");
            return detailedType;
        });
    }
    static getDetailedTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const detailedTypes = yield DetailedType_1.default.find({}).populate("parent");
            return detailedTypes;
        });
    }
    static getDetailedTypesByParent(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const detailedTypes = yield DetailedType_1.default.find({
                parent: parentId,
            });
            return detailedTypes;
        });
    }
    static createDetailedType(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const detailedType = yield DetailedType_1.default.create(params);
            return detailedType;
        });
    }
    static updateDetailedType(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const detailedType = yield DetailedType_1.default.findByIdAndUpdate(params._id, params, { new: true });
            return detailedType;
        });
    }
    static deleteDetailedType(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const detailedType = yield DetailedType_1.default.findByIdAndDelete(_id);
            return detailedType;
        });
    }
}
exports.default = DetailedTypeServices;
//# sourceMappingURL=detailedType.js.map