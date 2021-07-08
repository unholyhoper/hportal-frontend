import {Medecine} from './medecine';
import {User} from './user';

export class Appointment {


  id: number;
  doctor: User;
  date: Date;
  priorite: string;
  status: string;
  patient: User;
  description: String;

  constructor(id: number, doctor: User, date: Date, priorite: string, status: string, patient: User, description: string) {
    this.id = id;
    this.doctor = doctor;
    this.date = date;
    this.priorite = priorite;
    this.status = status;
    this.patient = patient;
    this.description = description;
  }

}
