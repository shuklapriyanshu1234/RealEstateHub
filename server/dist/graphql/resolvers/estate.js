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
const estate_1 = __importDefault(require("../../services/estate"));
exports.default = {
    Query: {
        estate(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estate = yield estate_1.default.getEstate(args._id);
                return estate;
            });
        },
        estates(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estates = yield estate_1.default.getEstates(args.limit, args.offset);
                return estates;
            });
        },
        estatesBySeller(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estates = yield estate_1.default.getEstatesBySeller(args.sellerId, args.limit, args.offset);
                return estates;
            });
        },
        estatesByFilter(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estates = yield estate_1.default.getEstatesByFilter(args);
                return estates;
            });
        },
        estatesSortedByDate(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estates = yield estate_1.default.getEstatesSortedByDate(args.desc, args.limit, args.offset);
                return estates;
            });
        },
        estatesSortedByPrice(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estates = yield estate_1.default.getEstatesSortedByPrice(args.desc, args.limit, args.offset);
                return estates;
            });
        },
        estatesBySearch(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estates = yield estate_1.default.getEstatesBySearch(args.search, args.sortBy, args.order, args.limit, args.offset);
                return estates;
            });
        },
    },
    Mutation: {
        createEstate(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estate = yield estate_1.default.createEstate(args);
                return estate;
            });
        },
        updateEstate(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const estate = yield estate_1.default.updateEstate(args);
                return estate;
            });
        },
    },
};
//# sourceMappingURL=estate.js.map