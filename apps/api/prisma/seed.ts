import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

config({
  path: fileURLToPath(new URL('../../../.env', import.meta.url)),
  quiet: true,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const locations = [
  {
    name: 'Exemplo — Belo Horizonte',
    address: 'Rua Fictícia, 300 — endereço de demonstração',
    city: 'Belo Horizonte',
    state: 'MG',
  },
  {
    name: 'Exemplo — Rio de Janeiro',
    address: 'Rua Fictícia, 200 — endereço de demonstração',
    city: 'Rio de Janeiro',
    state: 'RJ',
  },
  {
    name: 'Exemplo — São Paulo',
    address: 'Rua Fictícia, 100 — endereço de demonstração',
    city: 'São Paulo',
    state: 'SP',
  },
];

try {
  await prisma.$transaction([
    ...['Hatch', 'Sedan', 'SUV', 'Minivan', 'Picape'].map((name) =>
      prisma.category.upsert({ where: { name }, update: {}, create: { name } }),
    ),
    ...locations.map((location) =>
      prisma.location.upsert({
        where: { name: location.name },
        update: {},
        create: location,
      }),
    ),
  ]);
} catch {
  console.error(
    'Falha ao executar o seed de categorias e locais. Verifique a conexão e as migrations.',
  );
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
