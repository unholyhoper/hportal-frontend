import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  constructor() { }
  allMedicalRecord(){
    return of([])
  }
  deleteMedicalRecord(id){
    return of()
  }
  getMedicalRecord(id){
    return of()
  }
  updateMedecine(medicalRecord){
    return of()
  }
  addMedecine(medicalRecord){
    return of()
  }
}
