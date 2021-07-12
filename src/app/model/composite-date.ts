import {Country} from './enum/country.enum';
import {Gender} from './enum/gender.enm';
import {Region} from './enum/region.enum';
import {Role} from './enum/role.enum';

export class CompositeDate {
  day: string;
  month: string;
  year: string;


  constructor(day: string, month: string, year: string) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
}
