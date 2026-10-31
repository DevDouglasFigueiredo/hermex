import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Vehicle } from './models/vehicle/vehicle.js';
import { VehiclesService } from './vehicles.service.js';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => [Vehicle])
  vehicles(
    @Args('categoryId', { type: () => ID, nullable: true })
    categoryId?: string | null,
  ): Promise<Vehicle[]> {
    return this.vehiclesService.findAll(categoryId);
  }
}
