import { registerEnumType } from '@nestjs/graphql';

export enum Transmission {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

registerEnumType(Transmission, { name: 'Transmission' });
