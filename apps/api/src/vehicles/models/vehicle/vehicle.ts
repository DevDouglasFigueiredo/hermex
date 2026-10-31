import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

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

  @Field(() => Boolean)
  available!: boolean;
}
