import { readFileSync, readdirSync } from "node:fs";
import { findMissingDoctorRoutes } from "../src/domain/doctor-catalog";
import { doctorSchema } from "../src/domain/doctor";

const doctors = doctorSchema
  .array()
  .parse(JSON.parse(readFileSync("src/db/data.json", "utf8")));
const errors = findMissingDoctorRoutes(doctors, readdirSync("dist"));

if (errors.length > 0) throw new Error(errors.join("\n"));

console.log(`Verificate ${doctors.length} route statiche dei medici.`);
