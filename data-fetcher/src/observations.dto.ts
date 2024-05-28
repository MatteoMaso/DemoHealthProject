import { z } from "zod";

// Define enums for units and other enumerated values
const UnitEnum = z.enum(['mgdl', 'mmoll', 'ul', 'gdl']);

// Define a schema for gender and ethnicity as integers with specific values
const GenderEnum = z.union([z.literal(1), z.literal(2)]); // Assuming 1 for Male and 2 for Female
const EthnicityEnum = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
]); // Assuming these are the possible values for ethnicity

export const observationSchema = z.object({
  client_id: z.string().regex(/^[a-f0-9]{8}$/, { message: 'Invalid client_id format' }),
  date_testing: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),
  date_birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),
  gender: GenderEnum.transform((val) => {
    switch (val) {
      case 1:
        return "Male";
      case 2:
        return "Female";
      default:
        return "Other";
    }
  }),
  ethnicity: EthnicityEnum.transform((val) => {
    switch (val) {
      case 1:
        return "Hispanic";
      case 2:
        return "White";
      case 3:
        return "Black";
      case 4:
        return "Asian";
      case 5:
        return "AmericanIndian";
      case 6:
        return "NativeHawaiian";
      case 7:
        return "MiddleEasternOrNorthAfrican";
      default:
        return "Multiracial";
    }
  }),
  creatine: z.number(),
  chloride: z.number(),
  fasting_glucose: z.number(),
  potassium: z.number(),
  sodium: z.number(),
  total_calcium: z.number(),
  total_protein: z.number(),
  creatine_unit: UnitEnum,
  chloride_unit: UnitEnum,
  fasting_glucose_unit: UnitEnum,
  potassium_unit: UnitEnum,
  sodium_unit: UnitEnum,
  total_calcium_unit: UnitEnum,
  total_protein_unit: UnitEnum,
});
