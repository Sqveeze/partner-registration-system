import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class CreateCompanyTypeInput {
  @IsNotEmpty()
  name: string;
}
