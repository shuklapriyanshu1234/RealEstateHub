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
const details_1 = __importDefault(require("../../services/details"));
exports.default = {
    Query: {
        details(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const details = yield details_1.default.getDetails(args._id);
                return details;
            });
        },
    },
    Mutation: {
        createDetails(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const details = yield details_1.default.createDetails(args);
                return details;
            });
        },
        updateDetails(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const details = yield details_1.default.updateDetails(args);
                return details;
            });
        },
    },
};
//# sourceMappingURL=details.js.map