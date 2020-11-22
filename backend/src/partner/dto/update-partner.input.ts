import { PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreatePartnerInput } from './create-partner.input';

export class UpdatePartnerInput extends PartialType(CreatePartnerInput) {
  @IsNotEmpty()
  id: number;
}
