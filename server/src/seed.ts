import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDb from "./config/db";
import Type from "./models/Type";
import DetailedType from "./models/DetailedType";
import Province from "./models/Province";
import District from "./models/District";

dotenv.config();

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

const seed = async () => {
  await connectDb();
  console.log("Connected. Seeding data...");

  // --- Types & Detailed Types ---
  for (const t of typesToSeed) {
    let typeDoc = await Type.findOne({ name: t.name });
    if (!typeDoc) {
      typeDoc = await Type.create({ name: t.name });
      console.log(`Created Type: ${t.name}`);
    } else {
      console.log(`Type already exists: ${t.name}`);
    }

    for (const dtName of t.detailedTypes) {
      const existing = await DetailedType.findOne({ name: dtName });
      if (!existing) {
        await DetailedType.create({ name: dtName, parent: typeDoc._id });
        console.log(`  Created DetailedType: ${dtName}`);
      } else {
        console.log(`  DetailedType already exists: ${dtName}`);
      }
    }
  }

  // --- Provinces (States) & Districts ---
  for (const p of provincesToSeed) {
    let provinceDoc = await Province.findOne({ code: p.code });
    if (!provinceDoc) {
      provinceDoc = await Province.create({ code: p.code, name: p.name });
      console.log(`Created Province: ${p.name}`);
    } else {
      console.log(`Province already exists: ${p.name}`);
    }

    for (const districtName of p.districts) {
      const existing = await District.findOne({
        name: districtName,
        province: provinceDoc._id,
      });
      if (!existing) {
        await District.create({ name: districtName, province: provinceDoc._id });
        console.log(`  Created District: ${districtName}`);
      } else {
        console.log(`  District already exists: ${districtName}`);
      }
    }
  }

  console.log("Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});