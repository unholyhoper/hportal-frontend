import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor() { }
  allMaterial(){
    return of([])
  }
  deleteMaterial(id){
    return of()
  }
  getMaterial(id){
    return of()
  }
  updateMaterial(data){
    return of()
  }
  addmMaterial(data){
    return of()
  }
}
