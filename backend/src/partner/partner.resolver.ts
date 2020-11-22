import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PartnerService } from './partner.service';
import { CreatePartnerInput } from './dto/create-partner.input';
import { UpdatePartnerInput } from './dto/update-partner.input';

@Resolver('Partner')
export class PartnerResolver {
  constructor(private readonly partnerService: PartnerService) {}

  @Mutation('createPartner')
  create(@Args('createPartnerInput') createPartnerInput: CreatePartnerInput) {
    return this.partnerService.create(createPartnerInput);
  }

  @Query('partners')
  findAll() {
    return this.partnerService.findAll();
  }

  @Query('partner')
  findOne(@Args('id') id: number) {
    return this.partnerService.findOne(id);
  }

  @Mutation('updatePartner')
  update(@Args('updatePartnerInput') updatePartnerInput: UpdatePartnerInput) {
    return this.partnerService.update(updatePartnerInput.id, updatePartnerInput);
  }

  @Mutation('removePartner')
  remove(@Args('id') id: number) {
    return this.partnerService.remove(id);
  }
}
