import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Prisma } from '../src/generated/prisma/client.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { VehiclesService } from '../src/vehicles/vehicles.service.js';

config({
  path: fileURLToPath(new URL('../../../.env', import.meta.url)),
  quiet: true,
});

describe('Vehicle no PostgreSQL (migration aplicada)', () => {
  it('persiste, normaliza placa, impõe restrições e lê pelo serviço sem deixar fixtures', async () => {
    const prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
    });
    const rollback = new Error('rollback das fixtures');
    const plate = randomUUID().replaceAll('-', '').toUpperCase();
    const data = {
      brand: 'Teste',
      model: 'Integração',
      year: -1,
      licensePlate: ` ${plate.toLowerCase().slice(0, 8)}-${plate.toLowerCase().slice(8)} `,
      dailyRate: new Prisma.Decimal('123.45'),
    };
    try {
      const before = await prisma.vehicle.count();
      await expect(
        prisma.$transaction(
          async (tx) => {
            const vehicle = await tx.vehicle.create({ data });
            expect(vehicle.id).toMatch(/^c[a-z0-9]+$/);
            expect(vehicle.available).toBe(true);
            expect(vehicle.licensePlate).toBe(plate);
            expect(vehicle.year).toBe(-1);
            expect(vehicle.dailyRate.toString()).toBe('123.45');
            const service = new VehiclesService(tx as unknown as PrismaService);
            expect(await service.findAll()).toContainEqual({
              ...vehicle,
              dailyRate: 123.45,
            });
            const updated = await tx.vehicle.update({
              where: { id: vehicle.id },
              data: {
                licensePlate: ` ${plate.toLowerCase()}- `,
                available: false,
                year: 2147483647,
              },
            });
            expect(updated.licensePlate).toBe(plate);
            expect(updated.year).toBe(2147483647);
            expect(
              (await service.findAll()).find((v) => v.id === vehicle.id)
                ?.available,
            ).toBe(false);

            for (const [index, invalid] of [
              { ...data, licensePlate: plate },
              {
                ...data,
                licensePlate: `${plate}ZERO`,
                dailyRate: new Prisma.Decimal(0),
              },
              {
                ...data,
                licensePlate: `${plate}NEG`,
                dailyRate: new Prisma.Decimal(-1),
              },
              {
                ...data,
                licensePlate: `${plate}NAN`,
                dailyRate: new Prisma.Decimal('NaN'),
              },
            ].entries()) {
              const savepoint = `vehicle_case_${index}`;
              await tx.$executeRawUnsafe(`SAVEPOINT ${savepoint}`);
              await expect(
                tx.vehicle.create({ data: invalid }),
              ).rejects.toThrow();
              await tx.$executeRawUnsafe(`ROLLBACK TO SAVEPOINT ${savepoint}`);
            }
            throw rollback;
          },
          { timeout: 15000 },
        ),
      ).rejects.toBe(rollback);
      expect(await prisma.vehicle.count()).toBe(before);
      expect(
        await prisma.vehicle.findUnique({ where: { licensePlate: plate } }),
      ).toBeNull();
    } finally {
      await prisma.$disconnect();
    }
  });
});
