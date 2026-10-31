import { config } from 'dotenv';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

config({
  path: fileURLToPath(new URL('../../../.env', import.meta.url)),
  quiet: true,
});

const migration = readFileSync(
  new URL(
    '../prisma/migrations/20261031202117_add_vehicle_category_image_transmission/migration.sql',
    import.meta.url,
  ),
  'utf8',
).replace(/^BEGIN;|^COMMIT;$/gm, '');

describe('Migration HER-5 no PostgreSQL, com tabelas temporárias', () => {
  it.each([false, true])(
    'preserva a segurança com veículos existentes: %s',
    async (hasVehicles) => {
      const client = new pg.Client({
        connectionString: process.env.DATABASE_URL!,
      });
      await client.connect();
      try {
        await client.query('BEGIN');
        // Tabelas temporárias ocultam as reais apenas nesta conexão; rollback remove tudo.
        await client.query(
          'CREATE TEMP TABLE "Category" (id TEXT PRIMARY KEY)',
        );
        await client.query('CREATE TEMP TABLE "Vehicle" (id TEXT PRIMARY KEY)');
        if (hasVehicles) {
          await client.query(`INSERT INTO "Vehicle" VALUES ('existing')`);
          await expect(client.query(migration)).rejects.toThrow(
            'mapear categoria e transmissão',
          );
        } else {
          await client.query(migration);
          await client.query(`INSERT INTO "Category" VALUES ('category')`);
          await client.query(
            `INSERT INTO "Vehicle" (id, "categoryId", transmission) VALUES ('vehicle', 'category', 'MANUAL')`,
          );
          expect(
            (
              await client.query(
                'SELECT "imageUrl", transmission FROM "Vehicle"',
              )
            ).rows,
          ).toEqual([{ imageUrl: null, transmission: 'MANUAL' }]);
        }
      } finally {
        await client.query('ROLLBACK');
        await client.end();
      }
    },
  );
});
