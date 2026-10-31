import { Test } from '@nestjs/testing';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { VehiclesService } from './vehicles.service.js';

describe('VehiclesService', () => {
  const findMany = vi.fn();
  let service: VehiclesService;

  beforeEach(async () => {
    findMany.mockReset();
    const module = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: PrismaService, useValue: { vehicle: { findMany } } },
      ],
    }).compile();
    service = module.get(VehiclesService);
  });

  it('retorna [] quando não há veículos persistidos', async () => {
    findMany.mockResolvedValue([]);
    await expect(service.findAll()).resolves.toEqual([]);
    expect(findMany).toHaveBeenCalledExactlyOnceWith();
  });

  it('consulta todos os veículos e converte Decimal para número sem ocultar indisponíveis', async () => {
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
    await expect(service.findAll()).resolves.toEqual([
      { ...vehicle, dailyRate: 120.5 },
    ]);
    expect(findMany).toHaveBeenCalledExactlyOnceWith();
  });

  it('propaga falhas de leitura sem simular uma lista vazia', async () => {
    findMany.mockRejectedValue(new Error('Falha no banco'));
    await expect(service.findAll()).rejects.toThrow('Falha no banco');
  });
});
