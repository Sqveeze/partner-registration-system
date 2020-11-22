import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { CreateCityInput } from '../../city/dto/create-city.input';
import { CreateCompanyTypeInput } from '../../company-type/dto/create-company-type.input';

@ObjectType()
export class CreatePartnerInput {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  city: CreateCityInput;
  companyType: CreateCompanyTypeInput;
  taxNumber: string;
  companyRegistrationNumber: string;
  address: string;
  phoneNumber: string;
  bankAccountNumber: string;
  comment: string;
}
