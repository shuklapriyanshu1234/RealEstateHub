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
const district_1 = __importDefault(require("../../services/district"));
exports.default = {
    Query: {
        district(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const district = yield district_1.default.getDistrict(args._id);
                return district;
            });
        },
        districts() {
            return __awaiter(this, void 0, void 0, function* () {
                const districts = yield district_1.default.getDistricts();
                return districts;
            });
        },
        districtsByProvince(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const districts = yield district_1.default.getDistrictsByProvince(args.provinceId);
                return districts;
            });
        },
    },
    Mutation: {
        createDistrict(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const district = yield district_1.default.createDistrict(args);
                return district;
            });
        },
        updateDistrict(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const district = yield district_1.default.updateDistrict(args);
                return district;
            });
        },
        deleteDistrict(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const district = yield district_1.default.deleteDistrict(args._id);
                return district;
            });
        },
    },
};
//# sourceMappingURL=district.js.map