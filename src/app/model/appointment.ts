import {Medecine} from './medecine';
import {User} from './user';

export class Appointment {


  id: number;
  private _doctor: User;
  date: Date;
  priorite: string;
  status: string;
  patient: User;
  description: String;

  constructor(id: number, doctor: User, date: Date, priorite: string, status: string, patient: User, description: string) {
    this.id = id;
    this._doctor = doctor;
    this.date = date;
    this.priorite = priorite;
    this.status = status;
    this.patient = patient;
    this.description = description;
  }

  hasDoctor() {
    if (this._doctor == null ){
      return false;
    }
    return true
  }


  get doctor(): User {
    return this._doctor;
  }

  set doctor(value: User) {
    this._doctor = value;
  }
}
