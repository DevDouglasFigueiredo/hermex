import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { CategoriesService } from '../src/categories/categories.service.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

config({
  path: fileURLToPath(new URL('../../../.env', import.meta.url)),
  quiet: true,
});

describe('Category no PostgreSQL (migration e seed aplicados)', () => {
  it('persiste as cinco categorias únicas, com CUID e datas', async () => {
    const prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
    });
    const names = ['Hatch', 'Minivan', 'Picape', 'SUV', 'Sedan'];
    try {
      const categories = await prisma.category.findMany({
        where: { name: { in: names } },
        orderBy: { name: 'asc' },
      });
      expect(categories.map(({ name }) => name)).toEqual(names);
      const service = new CategoriesService(prisma as unknown as PrismaService);
      const listed = await service.findAll();
      expect(listed.filter(({ name }) => names.includes(name))).toEqual(
        categories,
      );
      for (const category of categories) {
        expect(category.id).toMatch(/^c[a-z0-9]+$/);
        expect(category.createdAt).toBeInstanceOf(Date);
        expect(category.updatedAt).toBeInstanceOf(Date);
      }
    } finally {
      await prisma.$disconnect();
    }
  });
});
