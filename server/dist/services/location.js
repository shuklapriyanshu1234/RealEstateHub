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
const Location_1 = __importDefault(require("../models/Location"));
class LocationService {
    static getLocation(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield Location_1.default.findById(_id).populate([
                "province",
                "district",
            ]);
            return location;
        });
    }
    static getLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = yield Location_1.default.find({}).populate([
                "province",
                "district",
            ]);
            return locations;
        });
    }
    static createLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield Location_1.default.create(params);
            return location.populate(["province", "district"]);
        });
    }
    static updateLocation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield Location_1.default.findByIdAndUpdate(params._id, params, {
                new: true,
            }).populate(['province', 'district']);
            return location;
        });
    }
}
exports.default = LocationService;
//# sourceMappingURL=location.js.map