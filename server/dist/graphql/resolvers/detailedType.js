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
const detailedType_1 = __importDefault(require("../../services/detailedType"));
exports.default = {
    Query: {
        detailedType(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const detailedType = yield detailedType_1.default.getDetailedType(args._id);
                return detailedType;
            });
        },
        detailedTypes() {
            return __awaiter(this, void 0, void 0, function* () {
                const detailedTypes = yield detailedType_1.default.getDetailedTypes();
                return detailedTypes;
            });
        },
        detailedTypesByParent(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const detailedTypes = yield detailedType_1.default.getDetailedTypesByParent(args.parentId);
                return detailedTypes;
            });
        }
    },
    Mutation: {
        createDetailedType(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const detailedType = yield detailedType_1.default.createDetailedType(args);
                return detailedType;
            });
        },
        updateDetailedType(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const detailedType = yield detailedType_1.default.updateDetailedType(args);
                return detailedType;
            });
        },
        deleteDetailedType(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const detailedType = yield detailedType_1.default.deleteDetailedType(args._id);
                return detailedType;
            });
        },
    },
};
//# sourceMappingURL=detailedType.js.map