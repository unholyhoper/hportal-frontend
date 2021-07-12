import {Country} from './enum/country.enum';
import {Gender} from './enum/gender.enm';
import {Region} from './enum/region.enum';
import {Role} from './enum/role.enum';
import {CompositeDate} from './composite-date';

export class RegisterUser {
  username: String;
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
  adress: string;
  privacyPolicy: boolean;
  phone: number;
  hospitalName: string;
  birthDate: any;

  constructor(
    username: string,
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
    adress: string,
    privacyPolicy: boolean,
    phone: number,
    hospitalName: string,
    birthDate: CompositeDate
) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.gender = gender;
    this.country = country;
    this.region = region;
    this.password = password;
    this.role = role;
    this.medicalSerial = medicalSerial;
    this.cin = cin;
    this.adress = adress;
    this.privacyPolicy = privacyPolicy;
    this.phone = phone;
    this.hospitalName = hospitalName;
    this.birthDate = birthDate;

  }
}
