import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DelgateService {

  constructor() { }
  allDiseases(){
    return of()
  }
  getDelegate(id){
    return of()
  }
  updateDelegate(data){
    return of()
  }
  addDelegate(data){
    return of()
  }
  deleteDelegate(id){
    return of()
  }
}
