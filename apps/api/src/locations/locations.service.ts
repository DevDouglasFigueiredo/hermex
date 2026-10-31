import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { Location } from './location.model.js';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Location[]> {
    return this.prisma.location.findMany({ orderBy: { name: 'asc' } });
  }
}
