import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Category } from '../../../categories/category.model.js';
import { Transmission } from '../../transmission.enum.js';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  brand!: string;

  @Field(() => String)
  model!: string;

  @Field(() => Int, { description: 'Ano-modelo do veículo.' })
  year!: number;

  @Field(() => String)
  licensePlate!: string;

  @Field(() => Float, { description: 'Diária em BRL, maior que zero.' })
  dailyRate!: number;

  @Field(() => String, { nullable: true })
  imageUrl!: string | null;

  @Field(() => Category)
  category!: Category;

  @Field(() => Transmission)
  transmission!: Transmission;

  @Field(() => Boolean)
  available!: boolean;
}
