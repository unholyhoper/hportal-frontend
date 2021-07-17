import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class DelgateService {

  constructor(private httpClient: HttpClient) { }
  allDiseases(){
    return of()
  }
  allDelegates(){
    return of()
  }
  updateDelegate(data){
    return of()
  }
  getDelegate(id){
    return this.httpClient.get<any>(`${BASE_PATH}/doctor/id`);
  }
  addDelegate(doctor){
    return this.httpClient.post<any>(`${BASE_PATH}/doctor`,doctor);
  }
  deleteDelegate(id){
    return of()
  }
}
