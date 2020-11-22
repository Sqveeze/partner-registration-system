import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { PartnerModule } from './partner/partner.module';
import { CompanyTypeModule } from './company-type/company-type.module';
import { CityModule } from './city/city.module';

import { Partner } from './partner/entities/partner.entity';
import { City } from './city/entities/city.entity';
import { CompanyType } from './company-type/entities/company-type.entity';

import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([Partner, City, CompanyType]),
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      typePaths: ['./**/*.graphql'],
    }),
    PartnerModule,
    CompanyTypeModule,
    CityModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private appService: AppService,
  ) {
    (async () => {
      await this.appService.init();
    })();
  }
}
