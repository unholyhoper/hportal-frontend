import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../model/login-user';
import { environment } from '../../environments/environment';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class MedecineService {
  constructor(private httpClient: HttpClient) { }
  allMedecines() {
    return this.httpClient.get<any>(`${BASE_PATH}/allMedecines`);
  }
}
