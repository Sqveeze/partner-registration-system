import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CityService } from './city.service';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

@Resolver('City')
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Mutation('createCity')
  create(@Args('createCityInput') createCityInput: CreateCityInput) {
    return this.cityService.create(createCityInput);
  }

  @Query('cities')
  findAll() {
    return this.cityService.findAll();
  }

  @Query('city')
  findOne(@Args('id') id: number) {
    return this.cityService.findOne(id);
  }

  @Mutation('updateCity')
  update(@Args('updateCityInput') updateCityInput: UpdateCityInput) {
    return this.cityService.update(updateCityInput.id, updateCityInput);
  }

  @Mutation('removeCity')
  remove(@Args('id') id: number) {
    return this.cityService.remove(id);
  }
}
