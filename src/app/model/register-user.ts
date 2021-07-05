import { Address } from "cluster";
import { Country } from "./enum/country.enum";
import { Gender } from "./enum/gender.enm";
import { Region } from "./enum/region.enum";
import { Role } from "./enum/role.enum";

export class RegisterUser {
  firstname: String;
  lastname: String;
  email: String;
  gender: Gender;
  country: Country;
  region: Region;
  password: String;
  role: Role;
  medicalSerial: number;
  cin: number;
  adress: Address;
  privacyPolicy: boolean;
  phone: number;
  constructor(
    firstname: String,
    lastname: String,
    email: String,
    gender: Gender,
    country: Country,
    region: Region,
    password: String,
    role: Role,
    medicalSerial: number,
    cin: number,
    adress: Address,
    privacyPolicy: boolean,
    phone: number
  ) {
    this.firstname=firstname
    this.lastname=lastname
    this.email=email
    this.gender=gender
    this.country=country
    this.region=region
    this.password=password
    this.role=role
    this.medicalSerial=medicalSerial
    this.cin=cin
    this.adress=adress
    this.privacyPolicy=privacyPolicy
    this.phone=phone
  }
}
