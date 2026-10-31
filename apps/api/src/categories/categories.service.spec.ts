import { CategoriesService } from './categories.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('CategoriesService', () => {
  const findMany = vi.fn();
  const service = new CategoriesService({
    category: { findMany },
  } as unknown as PrismaService);

  it('solicita todas as categorias ordenadas por nome', async () => {
    const categories = [{ id: 'category-1', name: 'Hatch' }];
    findMany.mockResolvedValueOnce(categories);
    expect(await service.findAll()).toEqual(categories);
    expect(findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('retorna lista vazia quando não há categorias', async () => {
    findMany.mockResolvedValueOnce([]);
    expect(await service.findAll()).toEqual([]);
  });

  it('propaga falhas de persistência', async () => {
    const error = new Error('database unavailable');
    findMany.mockRejectedValueOnce(error);
    await expect(service.findAll()).rejects.toBe(error);
  });
});
