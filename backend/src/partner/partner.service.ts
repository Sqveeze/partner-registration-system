import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePartnerInput } from './dto/create-partner.input';
import { UpdatePartnerInput } from './dto/update-partner.input';

import { Partner } from './entities/partner.entity';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner) private partnerRepository: Repository<Partner>,
  ) {}

  async findAll() {
    const partners = await this.partnerRepository.find({
      relations: ['city', 'companyType']
    });

    return partners;
  }

  async findOne(id: number) {
    const partner = await this.partnerRepository.findOne(id, {
      relations: ['city', 'companyType']
    });

    return partner;
  }

  async create(createPartnerInput: CreatePartnerInput) {
    const partner = this.partnerRepository.create(createPartnerInput);

    const result = await this.partnerRepository.save(partner);

    return result;
  }

  async update(id: number, updatePartnerInput: UpdatePartnerInput) {
    const partner = await this.findOne(id);

    const result = await this.partnerRepository.update(id, {
      ...updatePartnerInput,
    });

    return {
      ...partner,
      ...result,
    };
  }

  async remove(id: number) {
    const partner = await this.findOne(id);

    await this.partnerRepository.delete(partner.id);

    return partner;
  }
}
