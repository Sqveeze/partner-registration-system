import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyTypeService } from './company-type.service';
import { CompanyTypeResolver } from './company-type.resolver';

import { CompanyType } from './entities/company-type.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyType])
  ],
  providers: [
    CompanyTypeResolver,
    CompanyTypeService
  ]
})
export class CompanyTypeModule {}
