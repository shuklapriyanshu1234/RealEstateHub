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
const province_1 = __importDefault(require("../../services/province"));
exports.default = {
    Query: {
        province(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const province = yield province_1.default.getProvince(args._id);
                return province;
            });
        },
        provinceByCode(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const province = yield province_1.default.getProvinceByCode(args.code);
                return province;
            });
        },
        provinces() {
            return __awaiter(this, void 0, void 0, function* () {
                const provinces = yield province_1.default.getProvinces();
                return provinces;
            });
        },
    },
    Mutation: {
        createProvince(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const province = yield province_1.default.createProvince(args);
                return province;
            });
        },
        updateProvince(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const province = yield province_1.default.updateProvince(args);
                return province;
            });
        },
        deleteProvince(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const province = yield province_1.default.deleteProvince(args._id);
                return province;
            });
        },
    },
};
//# sourceMappingURL=province.js.map