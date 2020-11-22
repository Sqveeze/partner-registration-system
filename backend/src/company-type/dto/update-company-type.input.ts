import { PartialType } from '@nestjs/graphql';

import { CreateCompanyTypeInput } from './create-company-type.input';

export class UpdateCompanyTypeInput extends PartialType(CreateCompanyTypeInput) {
  id: number;
}
