import { PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateCityInput } from './create-city.input';

export class UpdateCityInput extends PartialType(CreateCityInput) {
  @IsNotEmpty()
  id: number;
}
