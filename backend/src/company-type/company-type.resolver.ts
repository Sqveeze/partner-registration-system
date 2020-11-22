import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompanyTypeService } from './company-type.service';
import { CreateCompanyTypeInput } from './dto/create-company-type.input';
import { UpdateCompanyTypeInput } from './dto/update-company-type.input';

@Resolver('CompanyType')
export class CompanyTypeResolver {
  constructor(private readonly companyTypeService: CompanyTypeService) {}

  @Mutation('createCompanyType')
  create(@Args('createCompanyTypeInput') createCompanyTypeInput: CreateCompanyTypeInput) {
    return this.companyTypeService.create(createCompanyTypeInput);
  }

  @Query('companyTypes')
  findAll() {
    return this.companyTypeService.findAll();
  }

  @Query('companyType')
  findOne(@Args('id') id: number) {
    return this.companyTypeService.findOne(id);
  }

  @Mutation('updateCompanyType')
  update(
    @Args('id') id: number,
    @Args('updateCompanyTypeInput') updateCompanyTypeInput: UpdateCompanyTypeInput
  ) {
    return this.companyTypeService.update(id, updateCompanyTypeInput);
  }

  @Mutation('removeCompanyType')
  remove(@Args('id') id: number) {
    return this.companyTypeService.remove(id);
  }
}
