import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { VehiclesService } from './vehicles.service.js';
import { VehiclesResolver } from './vehicles.resolver.js';

@Module({
  imports: [PrismaModule],
  providers: [VehiclesService, VehiclesResolver],
})
export class VehiclesModule {}
