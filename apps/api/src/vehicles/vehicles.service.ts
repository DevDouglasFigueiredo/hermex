import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { Vehicle } from './models/vehicle/vehicle.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany();
    return vehicles.map((vehicle) => ({
      ...vehicle,
      dailyRate: vehicle.dailyRate.toNumber(),
    }));
  }
}
