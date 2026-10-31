import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { LocationsService } from '../src/locations/locations.service.js';

config({
  path: fileURLToPath(new URL('../../../.env', import.meta.url)),
  quiet: true,
});

const createClient = () =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
  });

describe('Location no PostgreSQL', () => {
  it('persiste, ordena pelo serviço e aplica unicidade e tamanho de state com rollback', async () => {
    const prisma = createClient();
    const rollback = new Error('rollback de fixtures');
    const suffix = randomUUID();
    try {
      await expect(
        prisma.$transaction(async (tx) => {
          const data = {
            name: `B ${suffix}`,
            address: 'Rua de teste',
            city: 'Cidade de teste',
            state: 'xx',
          };
          const location = await tx.location.create({ data });
          await tx.location.create({ data: { ...data, name: `A ${suffix}` } });
          expect(location.id).toMatch(/^c[a-z0-9]+$/);
          expect(location.createdAt).toBeInstanceOf(Date);
          expect(location.updatedAt).toBeInstanceOf(Date);
          const service = new LocationsService(tx as unknown as PrismaService);
          const listed = (await service.findAll()).filter(({ name }) =>
            name.includes(suffix),
          );
          expect(listed.map(({ name }) => name)).toEqual([
            `A ${suffix}`,
            `B ${suffix}`,
          ]);
          for (const [index, invalid] of [
            data,
            { ...data, name: `C ${suffix}`, state: 'S' },
            { ...data, name: `D ${suffix}`, state: 'SPX' },
          ].entries()) {
            const savepoint = `location_case_${index}`;
            await tx.$executeRawUnsafe(`SAVEPOINT ${savepoint}`);
            await expect(
              tx.location.create({ data: invalid }),
            ).rejects.toThrow();
            await tx.$executeRawUnsafe(`ROLLBACK TO SAVEPOINT ${savepoint}`);
          }
          throw rollback;
        }),
      ).rejects.toBe(rollback);
      expect(
        await prisma.location.count({ where: { name: { contains: suffix } } }),
      ).toBe(0);
    } finally {
      await prisma.$disconnect();
    }
  });

  it('executa o seed duas vezes preservando IDs, locais existentes e categorias', async () => {
    const prisma = createClient();
    const seed = () =>
      promisify(execFile)(
        'pnpm',
        ['--filter', '@hermex/api', 'exec', 'prisma', 'db', 'seed'],
        {
          cwd: fileURLToPath(new URL('../../../', import.meta.url)),
        },
      );
    try {
      const categoriesBefore = await prisma.category.findMany({
        orderBy: { name: 'asc' },
      });
      const existing = await prisma.location.findMany({
        orderBy: { name: 'asc' },
      });
      await seed();
      const first = await prisma.location.findMany({
        orderBy: { name: 'asc' },
      });
      await seed();
      expect(
        await prisma.location.findMany({ orderBy: { name: 'asc' } }),
      ).toEqual(first);
      for (const location of existing) expect(first).toContainEqual(location);
      const examples = first.filter(({ name }) =>
        [
          'Exemplo — Belo Horizonte',
          'Exemplo — Rio de Janeiro',
          'Exemplo — São Paulo',
        ].includes(name),
      );
      expect(examples).toHaveLength(3);
      expect(new Set(examples.map(({ city }) => city)).size).toBe(3);
      const categoriesAfter = await prisma.category.findMany({
        orderBy: { name: 'asc' },
      });
      for (const category of categoriesBefore)
        expect(categoriesAfter).toContainEqual(category);
      expect(categoriesAfter.map(({ name }) => name)).toEqual(
        expect.arrayContaining(['Hatch', 'Sedan', 'SUV', 'Minivan', 'Picape']),
      );
    } finally {
      await prisma.$disconnect();
    }
  });
});
