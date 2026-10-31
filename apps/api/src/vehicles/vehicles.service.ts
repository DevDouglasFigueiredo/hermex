import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Transmission } from './transmission.enum.js';
import type { Vehicle } from './models/vehicle/vehicle.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      include: { category: true },
    });
    return vehicles.map((vehicle) => ({
      ...vehicle,
      transmission: this.toTransmission(vehicle.transmission),
      dailyRate: vehicle.dailyRate.toNumber(),
    }));
  }

  private toTransmission(value: string): Transmission {
    switch (value) {
      case 'MANUAL':
        return Transmission.MANUAL;
      case 'AUTOMATIC':
        return Transmission.AUTOMATIC;
      default:
        throw new Error('Transmissão inválida persistida no veículo.');
    }
  }
}
