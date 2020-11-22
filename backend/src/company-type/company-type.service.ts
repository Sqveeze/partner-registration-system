import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCompanyTypeInput } from './dto/create-company-type.input';
import { UpdateCompanyTypeInput } from './dto/update-company-type.input';

import { CompanyType } from './entities/company-type.entity';

@Injectable()
export class CompanyTypeService {
  constructor(
    @InjectRepository(CompanyType) private companyTypeRepository: Repository<CompanyType>,
  ) {}

  async create(createCompanyTypeInput: CreateCompanyTypeInput) {
    const companyType = this.companyTypeRepository.create(createCompanyTypeInput);

    await this.companyTypeRepository.save(companyType);

    return companyType;
  }

  findAll() {
    const companyTypes = this.companyTypeRepository.find();

    return companyTypes;
  }

  findOne(id: number) {
    const companyType = this.companyTypeRepository.findOne(id);

    return companyType;
  }

  update(id: number, updateCompanyTypeInput: UpdateCompanyTypeInput) {
    return `This action updates a #${id} companyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyType`;
  }
}
