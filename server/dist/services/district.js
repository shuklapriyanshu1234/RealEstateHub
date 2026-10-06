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
const District_1 = __importDefault(require("../models/District"));
class DistrictService {
    static getDistrict(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield District_1.default.findById(_id).populate("province");
            return district;
        });
    }
    static getDistricts() {
        return __awaiter(this, void 0, void 0, function* () {
            const districts = yield District_1.default.find({}).populate("province");
            return districts;
        });
    }
    static getDistrictsByProvince(provinceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const districts = yield District_1.default.find({
                province: provinceId,
            }).populate("province");
            return districts;
        });
    }
    static createDistrict(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield District_1.default.create(params);
            return district;
        });
    }
    static updateDistrict(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield District_1.default.findByIdAndUpdate(params._id, params, {
                new: true,
            });
            return district;
        });
    }
    static deleteDistrict(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const district = yield District_1.default.findByIdAndDelete(_id);
            return district;
        });
    }
}
exports.default = DistrictService;
//# sourceMappingURL=district.js.map