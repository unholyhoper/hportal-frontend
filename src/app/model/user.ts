import {Medecine} from './medecine';

export class User {
  id: number;
  username: string;
  roles: string;
  firstName: string;
  lastName: string;
  cin: number;
  address: number;
  country: number;
  medicalSerial: number;
  email: number;
  phone: number;


  constructor(id: number, username: string, roles: string, firstName: string, lastName: string, cin: number, address: number, country: number, medicalSerial: number, email: number, phone: number) {
    this.id = id;
    this.username = username;
    this.roles = roles;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cin = cin;
    this.address = address;
    this.country = country;
    this.medicalSerial = medicalSerial;
    this.email = email;
    this.phone = phone;
  }
}
