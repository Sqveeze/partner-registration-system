import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';

import { Partner } from './partner/entities/partner.entity';
import { City } from './city/entities/city.entity';
import { CompanyType } from './company-type/entities/company-type.entity';

interface RepositoryDetails {
  name: RepositoryName;
  count: number;
}

type RepositoryName = 'partner' | 'city' | 'companyType';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Partner) private partnerRepository: Repository<Partner>,
    @InjectRepository(City) private cityRepository: Repository<City>,
    @InjectRepository(CompanyType) private companyTypeRepository: Repository<CompanyType>,
  ) {}

  async checkExist(repository: RepositoryName, name: string) {
    if (repository === 'partner') return false;

    const isExist = await this[`${repository}Repository`].find({
      where: {
        name,
      }
    });

    if (isExist.length > 0) return true;
    return false;
  }

  getSeedData(repository: RepositoryName) {
    switch(repository) {
      case 'partner':
        return {
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          companyType: faker.random.number({ min: 1, max: 3 }),
          taxNumber: faker.finance.routingNumber(),
          companyRegistrationNumber: faker.finance.routingNumber(),
          city: faker.random.number({ min: 1, max: 10 }),
          address: `${faker.address.zipCode()} ${faker.address.city()}, ${faker.address.streetName()} ${faker.random.number({ min: 1, max: 50 })}`,
          phoneNumber: faker.phone.phoneNumber(),
          bankAccountNumber: faker.finance.iban(),
          comment: faker.lorem.paragraph(),
        }
      case 'city':
        return {
          name: faker.address.city(),
        }
      case 'companyType':
        return {
          name: `${faker.company.companySuffix()}`
        }
    }
  }

  async seedRepository(repository: RepositoryName) {
    for (let i = 0; i < Array.from(Array(20)).length; i += 1) {
      const seedData = this.getSeedData(repository);

      const isExist = await this.checkExist(repository, seedData.name);

      if (!isExist) {
        console.log(`[SEED] - Seeding ${repository} with: ${seedData.name}`);
        const result = this[`${repository}Repository`].create({
          ...seedData,
        });

        await this[`${repository}Repository`].save(result);
      }
    }
  }

  async determineSeedStatus (repositories: RepositoryDetails[]) {
    for (let i = 0; i < repositories.length; i += 1) {
      if (repositories[i].count === 0) {
        await this.seedRepository(repositories[i].name);
      }
    }
  }

  public async init() {
    const cities = await this.cityRepository.find();
    const companyTypes = await this.companyTypeRepository.find();
    const partners = await this.partnerRepository.find();

    await this.determineSeedStatus([{
      name: 'companyType',
      count: companyTypes.length,
     }, {
      name: 'city',
      count: cities.length,
    }, {
      name: 'partner',
      count: partners.length,
    }]);
  }
}
