-- Categoria e transmissão exigem mapeamento explícito se houver veículos.
-- Falhar antes de qualquer alteração evita atribuir dados de negócio inventados.
BEGIN;
LOCK TABLE "Vehicle" IN ACCESS EXCLUSIVE MODE;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "Vehicle") THEN
    RAISE EXCEPTION 'HER-5: mapear categoria e transmissão dos veículos existentes antes desta migration';
  END IF;
END $$;

/*
  Warnings:

  - Added the required column `categoryId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "transmission" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_transmission_check"
CHECK ("transmission" IN ('MANUAL', 'AUTOMATIC'));
COMMIT;
