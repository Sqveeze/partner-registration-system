export interface City {
  id: number;
  name: string;
  partners?: Partner[];
}

export interface CompanyType {
  id: number;
  name: string;
  partners?: Partner[];
}

export interface Partner {
  id: number;
  name: string;
  companyType?: CompanyType;
  taxNumber?: string;
  companyRegistrationNumber?: string;
  city: City;
  address?: string;
  phoneNumber?: string;
  bankAccountNumber?: string;
  comment?: string;
}

export interface PartnerData {
  partner: Partner;
}

export interface PartnersData {
  partners: Partner[];
}

export interface CityData {
  city: City;
}

export interface CitiesData {
  cities: City[];
}

export interface CompanyTypeData {
  companyType: CompanyType;
}

export interface CompanyTypesData {
  companyTypes: CompanyType[];
}

export interface PartnerVars {
  id?: number;
}

export interface NewPartner {
  name: string;
}

export interface NewCity {
  name: string;
}

export interface NewCompanyType {
  name: string;
}
