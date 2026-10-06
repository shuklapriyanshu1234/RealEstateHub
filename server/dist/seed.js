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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./config/db"));
const Type_1 = __importDefault(require("./models/Type"));
const DetailedType_1 = __importDefault(require("./models/DetailedType"));
const Province_1 = __importDefault(require("./models/Province"));
const District_1 = __importDefault(require("./models/District"));
dotenv_1.default.config();
const typesToSeed = [
    {
        name: "House",
        detailedTypes: ["Apartment", "Villa", "Bungalow", "Duplex"],
    },
    {
        name: "Workplace",
        detailedTypes: ["Office", "Retail Space", "Warehouse", "Coworking Space"],
    },
    {
        name: "Land",
        detailedTypes: ["Agricultural Land", "Commercial Land", "Residential Plot"],
    },
];
// Using Indian States as "Province" and their major cities/districts
const provincesToSeed = [
    { code: 1, name: "Delhi", districts: ["New Delhi", "North Delhi", "South Delhi", "East Delhi"] },
    { code: 2, name: "Maharashtra", districts: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
    { code: 3, name: "Karnataka", districts: ["Bengaluru Urban", "Mysuru", "Mangaluru", "Belagavi"] },
    { code: 4, name: "Tamil Nadu", districts: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
    { code: 5, name: "Uttar Pradesh", districts: ["Lucknow", "Kanpur", "Noida", "Varanasi"] },
    { code: 6, name: "Gujarat", districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
    { code: 7, name: "West Bengal", districts: ["Kolkata", "Howrah", "Darjeeling", "Siliguri"] },
    { code: 8, name: "Telangana", districts: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"] },
    { code: 9, name: "Rajasthan", districts: ["Jaipur", "Jodhpur", "Udaipur", "Kota"] },
    { code: 10, name: "Punjab", districts: ["Ludhiana", "Amritsar", "Chandigarh", "Patiala"] },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    console.log("Connected. Seeding data...");
    // --- Types & Detailed Types ---
    for (const t of typesToSeed) {
        let typeDoc = yield Type_1.default.findOne({ name: t.name });
        if (!typeDoc) {
            typeDoc = yield Type_1.default.create({ name: t.name });
            console.log(`Created Type: ${t.name}`);
        }
        else {
            console.log(`Type already exists: ${t.name}`);
        }
        for (const dtName of t.detailedTypes) {
            const existing = yield DetailedType_1.default.findOne({ name: dtName });
            if (!existing) {
                yield DetailedType_1.default.create({ name: dtName, parent: typeDoc._id });
                console.log(`  Created DetailedType: ${dtName}`);
            }
            else {
                console.log(`  DetailedType already exists: ${dtName}`);
            }
        }
    }
    // --- Provinces (States) & Districts ---
    for (const p of provincesToSeed) {
        let provinceDoc = yield Province_1.default.findOne({ code: p.code });
        if (!provinceDoc) {
            provinceDoc = yield Province_1.default.create({ code: p.code, name: p.name });
            console.log(`Created Province: ${p.name}`);
        }
        else {
            console.log(`Province already exists: ${p.name}`);
        }
        for (const districtName of p.districts) {
            const existing = yield District_1.default.findOne({
                name: districtName,
                province: provinceDoc._id,
            });
            if (!existing) {
                yield District_1.default.create({ name: districtName, province: provinceDoc._id });
                console.log(`  Created District: ${districtName}`);
            }
            else {
                console.log(`  District already exists: ${districtName}`);
            }
        }
    }
    console.log("Seeding complete.");
    yield mongoose_1.default.disconnect();
    process.exit(0);
});
seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map