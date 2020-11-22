import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { CompanyType } from '../../company-type/entities/company-type.entity';
import { City } from '../../city/entities/city.entity';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CompanyType, companyType => companyType.partners)
  companyType: CompanyType;

  @Column({ nullable: true })
  taxNumber: string;

  @Column({ nullable: true })
  companyRegistrationNumber: string;

  @ManyToOne(() => City, city => city.partners)
  city: City;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  bankAccountNumber: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
