import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }
  allPatient(){
    return of()
  }
  deletePatient(id){
    return of()
  }
  updatePatient(data){
    return of()
  }
  addPatient(data){
    return of()
  }
  getPatient(id){
    return of()
  }
}
