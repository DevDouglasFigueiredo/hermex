import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { Prisma } from '../src/generated/prisma/client.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const findMany = vi.fn();
  const findCategories = vi.fn();
  const findLocations = vi.fn();

  beforeEach(async () => {
    findMany.mockReset().mockResolvedValue([]);
    findCategories.mockReset().mockResolvedValue([]);
    findLocations.mockReset().mockResolvedValue([]);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $queryRaw: async () => [{ value: 1 }],
        vehicle: { findMany },
        category: { findMany: findCategories },
        location: { findMany: findLocations },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('executa health pelo schema GraphQL gerado', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ health }' })
      .expect(200);
    expect(response.body).toEqual({ data: { health: 'ok' } });
  });

  it('consulta vehicles com o campo model e retorna uma lista vazia', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: 'query { vehicles { model } }' })
      .expect(200);
    expect(response.body).toEqual({ data: { vehicles: [] } });
  });

  it('expõe todos os campos-base, com diária numérica, e preserva model', async () => {
    const vehicle = {
      id: 'vehicle-1',
      brand: 'Hyundai',
      model: 'HB20',
      year: 2026,
      licensePlate: 'ABC1D23',
      dailyRate: new Prisma.Decimal('120.50'),
      available: false,
    };
    findMany.mockResolvedValue([vehicle]);
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          '{ vehicles { id brand model year licensePlate dailyRate available } }',
      })
      .expect(200);
    expect(response.body).toEqual({
      data: { vehicles: [{ ...vehicle, dailyRate: 120.5 }] },
    });
    const legacy = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ vehicles { model } }' })
      .expect(200);
    expect(legacy.body).toEqual({ data: { vehicles: [{ model: 'HB20' }] } });
  });

  it('publica tipos obrigatórios no contrato GraphQL', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          '{ __type(name: "Vehicle") { fields { name type { kind ofType { name } } } } }',
      })
      .expect(200);
    const fields = response.body.data.__type.fields;
    expect(
      Object.fromEntries(
        fields.map(
          (field: {
            name: string;
            type: { kind: string; ofType: { name: string } };
          }) => [field.name, [field.type.kind, field.type.ofType.name]],
        ),
      ),
    ).toEqual({
      id: ['NON_NULL', 'ID'],
      brand: ['NON_NULL', 'String'],
      model: ['NON_NULL', 'String'],
      year: ['NON_NULL', 'Int'],
      licensePlate: ['NON_NULL', 'String'],
      dailyRate: ['NON_NULL', 'Float'],
      available: ['NON_NULL', 'Boolean'],
    });
  });

  it('consulta categories pelo módulo registrado, sem campos de persistência', async () => {
    const categories = ['Hatch', 'Minivan', 'Picape', 'SUV', 'Sedan'].map(
      (name, index) => ({ id: `category-${index}`, name }),
    );
    findCategories.mockResolvedValue(categories);
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ categories { id name } }' })
      .expect(200);
    expect(response.body).toEqual({ data: { categories } });
    expect(findCategories).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('consulta categories vazia sem erro', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ categories { id name } }' })
      .expect(200);
    expect(response.body).toEqual({ data: { categories: [] } });
  });

  it('consulta locations com todos os campos públicos pelo AppModule', async () => {
    const locations = [
      {
        id: 'location-1',
        name: 'Filial',
        address: 'Rua',
        city: 'Cidade',
        state: 'SP',
      },
    ];
    findLocations.mockResolvedValue(locations);
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ locations { id name address city state } }' })
      .expect(200);
    expect(response.body).toEqual({ data: { locations } });
    expect(findLocations).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('retorna locations vazia', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ locations { id name } }' })
      .expect(200);
    expect(response.body).toEqual({ data: { locations: [] } });
  });

  it('expõe somente os cinco campos obrigatórios de Location', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query:
          '{ __type(name: "Location") { fields { name type { kind ofType { name } } } } __schema { queryType { fields { name type { kind ofType { kind ofType { kind ofType { name } } } } } } } }',
      })
      .expect(200);
    expect(
      Object.fromEntries(
        response.body.data.__type.fields.map(
          (field: {
            name: string;
            type: { kind: string; ofType: { name: string } };
          }) => [field.name, [field.type.kind, field.type.ofType.name]],
        ),
      ),
    ).toEqual({
      id: ['NON_NULL', 'ID'],
      name: ['NON_NULL', 'String'],
      address: ['NON_NULL', 'String'],
      city: ['NON_NULL', 'String'],
      state: ['NON_NULL', 'String'],
    });
    const query = response.body.data.__schema.queryType.fields.find(
      (field: { name: string }) => field.name === 'locations',
    );
    expect(query.type).toEqual({
      kind: 'NON_NULL',
      ofType: {
        kind: 'LIST',
        ofType: { kind: 'NON_NULL', ofType: { name: 'Location' } },
      },
    });
  });

  it('disponibiliza o GraphiQL local', async () => {
    const response = await request(app.getHttpServer())
      .get('/graphql')
      .set('Accept', 'text/html')
      .expect(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('GraphiQL');
  });

  afterEach(async () => {
    await app.close();
  });
});
