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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const Estate_1 = __importDefault(require("../models/Estate"));
const notification_1 = __importDefault(require("./notification"));
const populateOptions = [
    { path: "seller" },
    { path: "type" },
    { path: "detailedType" },
    { path: "details" },
    {
        path: "location",
        populate: [{ path: "province" }, { path: "district" }],
    },
];
class EstateService {
    static getEstate(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const estate = yield Estate_1.default.findById(_id).populate(populateOptions);
            return estate;
        });
    }
    static getEstates(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const estates = yield Estate_1.default.find({ status: true })
                .populate(populateOptions)
                .sort({ updatedAt: "desc" })
                .limit(limit)
                .skip(offset);
            return estates;
        });
    }
    static getEstatesBySeller(sellerId, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const estates = yield Estate_1.default.find({ seller: sellerId, status: true })
                .populate(populateOptions)
                .sort({ updatedAt: "desc" })
                .limit(limit)
                .skip(offset);
            return estates;
        });
    }
    static getEstatesByFilter(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { minPrice, maxPrice, minSize, maxSize, offset, order, sortBy, limit, province, district } = params, queryParams = __rest(params, ["minPrice", "maxPrice", "minSize", "maxSize", "offset", "order", "sortBy", "limit", "province", "district"]);
            const query = {
                status: true,
                price: { $gte: minPrice || 0, $lte: maxPrice || 1000000000 },
                size: { $gte: minSize || 0, $lte: maxSize || 1000000000 },
            };
            Object.keys(queryParams).forEach((key) => {
                // @ts-expect-error type diff
                query[key] = queryParams[key];
            });
            const estates = yield Estate_1.default.find(query)
                .populate(populateOptions)
                .sort(sortBy === "price"
                ? { price: order === "asc" ? "asc" : "desc" }
                : { updatedAt: order === "asc" ? "asc" : "desc" })
                .limit(limit)
                .skip(offset);
            let filteredEstates = estates;
            if (district || province) {
                filteredEstates = estates.filter((estate) => {
                    if (district)
                        return (estate.location.district._id == district &&
                            estate.location.province._id == province);
                    return estate.location.province._id == province;
                });
            }
            return filteredEstates;
        });
    }
    static getEstatesSortedByDate(desc, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const estates = yield Estate_1.default.find({ status: true })
                .populate(populateOptions)
                .sort({ updatedAt: desc ? "desc" : "asc" })
                .limit(limit)
                .skip(offset);
            return estates;
        });
    }
    static getEstatesSortedByPrice(desc, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const estates = yield Estate_1.default.find({ status: true })
                .populate(populateOptions)
                .sort({ price: desc ? "desc" : "asc" })
                .limit(limit)
                .skip(offset);
            return estates;
        });
    }
    static getEstatesBySearch(search, sortBy, order, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const lowerCasedSearch = search.toLowerCase();
            const estates = yield Estate_1.default.find({ status: true })
                .populate(populateOptions)
                .sort(sortBy === "price"
                ? { price: order === "asc" ? "asc" : "desc" }
                : { updatedAt: order === "asc" ? "asc" : "desc" })
                .limit(limit)
                .skip(offset);
            const filteredEstates = estates.filter((estate) => estate.location.province.name
                .toLowerCase()
                .includes(lowerCasedSearch) ||
                estate.location.district.name
                    .toLowerCase()
                    .includes(lowerCasedSearch) ||
                estate.location.address.toLowerCase().includes(lowerCasedSearch) ||
                estate.title.toLowerCase().includes(lowerCasedSearch));
            return filteredEstates;
        });
    }
    static createEstate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const estate = yield Estate_1.default.create(params);
            return estate.populate(populateOptions);
        });
    }
    static updateEstate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = params, updates = __rest(params, ["_id"]);
            const previousEstate = yield Estate_1.default.findById(_id);
            const estate = yield Estate_1.default.findByIdAndUpdate(_id, updates, {
                new: true,
            }).populate(populateOptions);
            const users = yield user_1.default.getUsersByFavorite(_id);
            let notificationBody = { user: "", estate: _id, message: "" };
            if (params.price !== undefined && previousEstate) {
                if (previousEstate.price > params.price)
                    notificationBody.message =
                        "One of your favorite listings has decreased in price.";
                else if (previousEstate.price < params.price)
                    notificationBody.message =
                        "One of your favorite listings has increased in price.";
                else
                    notificationBody.message =
                        "One of your favorite listings has been updated.";
            }
            else {
                notificationBody.message =
                    "One of your favorite listings has been updated.";
            }
            users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                notificationBody.user = user._id;
                yield notification_1.default.createNotification(notificationBody);
            }));
            return estate;
        });
    }
}
exports.default = EstateService;
//# sourceMappingURL=estate.js.map