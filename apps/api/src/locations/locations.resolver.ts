import { Query, Resolver } from '@nestjs/graphql';
import { Location } from './location.model.js';
import { LocationsService } from './locations.service.js';

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Query(() => [Location])
  locations(): Promise<Location[]> {
    return this.locationsService.findAll();
  }
}
