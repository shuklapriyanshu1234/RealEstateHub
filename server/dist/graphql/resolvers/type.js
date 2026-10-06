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
const type_1 = __importDefault(require("../../services/type"));
exports.default = {
    Query: {
        type(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const type = yield type_1.default.getType(args._id);
                return type;
            });
        },
        types() {
            return __awaiter(this, void 0, void 0, function* () {
                const types = yield type_1.default.getTypes();
                return types;
            });
        },
    },
    Mutation: {
        createType(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const type = yield type_1.default.createType(args);
                return type;
            });
        },
        updateType(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const type = yield type_1.default.updateType(args);
                return type;
            });
        },
        deleteType(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const type = yield type_1.default.deleteType(args._id);
                return type;
            });
        },
    },
};
//# sourceMappingURL=type.js.map