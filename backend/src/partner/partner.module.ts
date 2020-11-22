import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PartnerService } from './partner.service';
import { PartnerResolver } from './partner.resolver';

import { Partner } from './entities/partner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner])
  ],
  providers: [
    PartnerResolver,
    PartnerService
  ],
})
export class PartnerModule {}
