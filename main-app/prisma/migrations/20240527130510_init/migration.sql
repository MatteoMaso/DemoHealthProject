-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Other', 'Male', 'Female');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('Hispanic', 'White', 'Black', 'Asian', 'AmericanIndian', 'NativeHawaiian', 'MiddleEasternOrNorthAfrican', 'Multiracial');

-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('mgdl', 'mmoll', 'ul', 'gdl');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "birthday_date" DATE,
    "gender" "Gender",
    "ethnicity" "Ethnicity",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" TEXT NOT NULL,
    "client_id" VARCHAR(36) NOT NULL,
    "date_testing" DATE,
    "creatine" DOUBLE PRECISION,
    "chloride" DOUBLE PRECISION,
    "fasting_glucose" DOUBLE PRECISION,
    "potassium" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "total_calcium" DOUBLE PRECISION,
    "total_protein" DOUBLE PRECISION,
    "creatine_unit" "MeasurementUnit",
    "chloride_unit" "MeasurementUnit",
    "fasting_glucose_unit" "MeasurementUnit",
    "potassium_unit" "MeasurementUnit",
    "sodium_unit" "MeasurementUnit",
    "total_calcium_unit" "MeasurementUnit",
    "total_protein_unit" "MeasurementUnit",

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
