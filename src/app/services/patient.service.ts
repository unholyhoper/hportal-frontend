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
  deleteMedecine(id){
    return of()
  }
}
