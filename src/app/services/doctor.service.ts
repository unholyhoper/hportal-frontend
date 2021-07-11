import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) { }
  getdoctor(id){
    return this.httpClient.get<any>(`${BASE_PATH}/doctor/id`)
  }
  addDoctor(doctor){
    return this.httpClient.post<any>(`${BASE_PATH}/doctor`,doctor)
  }
  allDoctor(){
    return of()
  }
  deleteDoctor(id){
    return of()
  }
  updateDoctor(data){
    return of ()
  }
}
