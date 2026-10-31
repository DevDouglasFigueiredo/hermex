import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CategoriesResolver } from './categories.resolver.js';
import { CategoriesService } from './categories.service.js';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
