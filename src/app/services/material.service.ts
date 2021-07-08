import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() { }
  allMaterial(){
    return of()
  }
  deleteMedecine(id){
    return of()
  }
}
