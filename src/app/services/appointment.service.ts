import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }



  allDiseases() {
    return this.httpClient.get<any>(`${BASE_PATH}/allAppointments`);
  }

  addAppointment(appointment) {
    return this.httpClient.post<any>(`${BASE_PATH}/appointment`, appointment);
  }

}
