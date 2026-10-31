import { Query, Resolver } from '@nestjs/graphql';
import { Category } from './category.model.js';
import { CategoriesService } from './categories.service.js';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
