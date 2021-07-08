import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  constructor() { }
  allMedicalRecord(){
    return of()
  }
  deleteMedecine(id){
    return of()
  }
}
