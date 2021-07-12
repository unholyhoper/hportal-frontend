import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
  import { RegisterUser } from '../model/register-user';
const BASE_PATH = environment.basePath;
const REGISTER_PATH = environment.registerPath;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient:HttpClient) { }
  addUser(login : RegisterUser) {
    return this.httpClient.post<any>(`${REGISTER_PATH}`, login);
  }
  getUser(cin:number){
    return this.httpClient.get<any>(`${BASE_PATH}/user/${cin}`)
  }
  getUsers(){
    return this.httpClient.get<any>(`${BASE_PATH}/users`)
  }
  updateUser(cin:number,body?:RegisterUser){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.httpClient.put<any>(`${BASE_PATH}/user/${cin}`, body, {
      headers: headers})
  }
  deleteUser(cin:number){
    return this.httpClient.delete<number>(`${BASE_PATH}/user/${cin}`)
  }
}
