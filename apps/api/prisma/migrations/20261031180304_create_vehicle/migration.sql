-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "dailyRate" DECIMAL(10,2) NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");

-- Monetary values must be positive and finite (PostgreSQL numeric accepts NaN).
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_dailyRate_positive"
    CHECK ("dailyRate" > 0 AND "dailyRate" < 100000000);

-- There is no write API yet: normalize every insert/update at the database boundary.
CREATE FUNCTION normalize_vehicle_license_plate() RETURNS trigger AS $$
BEGIN
    NEW."licensePlate" := upper(regexp_replace(NEW."licensePlate", '[[:space:]-]', '', 'g'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "Vehicle_normalize_licensePlate"
    BEFORE INSERT OR UPDATE OF "licensePlate" ON "Vehicle"
    FOR EACH ROW EXECUTE FUNCTION normalize_vehicle_license_plate();
