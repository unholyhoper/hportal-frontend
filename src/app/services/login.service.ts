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
  
  login(body) {
    try {
      return this.httpClient.post<any>(`${BASE_PATH}/login_check`, body)
    } catch (error) {
      console.log("error  ")
    }
 }
}
