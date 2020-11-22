import { Test, TestingModule } from '@nestjs/testing';
import { PartnerResolver } from './partner.resolver';
import { PartnerService } from './partner.service';

describe('PartnerResolver', () => {
  let resolver: PartnerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerResolver, PartnerService],
    }).compile();

    resolver = module.get<PartnerResolver>(PartnerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
