import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../model/login-user';
import { environment } from '../../environments/environment'
const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient:HttpClient) { }
  loginUser(login: LoginUser){
    return this.httpClient.post<any>(`${BASE_PATH}/authenticate`,login);
  }
}
