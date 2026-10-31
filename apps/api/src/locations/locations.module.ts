import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LocationsService } from './locations.service.js';
import { LocationsResolver } from './locations.resolver.js';

@Module({
  imports: [PrismaModule],
  providers: [LocationsService, LocationsResolver],
})
export class LocationsModule {}
