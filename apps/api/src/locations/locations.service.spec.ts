import { LocationsService } from './locations.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('LocationsService', () => {
  const findMany = vi.fn();
  const service = new LocationsService({
    location: { findMany },
  } as unknown as PrismaService);

  it('solicita todos os locais ordenados por nome', async () => {
    const locations = [
      {
        id: 'location-1',
        name: 'Filial',
        address: 'Rua',
        city: 'Cidade',
        state: 'SP',
      },
    ];
    findMany.mockResolvedValueOnce(locations);
    expect(await service.findAll()).toEqual(locations);
    expect(findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('retorna lista vazia quando não há locais', async () => {
    findMany.mockResolvedValueOnce([]);
    expect(await service.findAll()).toEqual([]);
  });

  it('propaga falhas de persistência', async () => {
    const error = new Error('database unavailable');
    findMany.mockRejectedValueOnce(error);
    await expect(service.findAll()).rejects.toBe(error);
  });
});
