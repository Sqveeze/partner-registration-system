import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async findAll() {
    const cities = await this.cityRepository.find();

    return cities;
  }

  async findOne(id: number) {
    const cities = await this.cityRepository.findOne(id);

    return cities;
  }

  async create(createCityInput: CreateCityInput) {
    const city = this.cityRepository.create(createCityInput);

    await this.cityRepository.save(city);

    return city;
  }

  async update(id: number, updateCityInput: UpdateCityInput) {
    const city = this.findOne(id);

    const result = await this.cityRepository.update(id, {
      ...updateCityInput
    });

    return {
      ...city,
      ...result,
    };
  }

  async remove(id: number) {
    const city = this.findOne(id);

    await this.cityRepository.delete(id);
    
    return city;
  }
}
