import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {RegisterUser} from '../model/register-user';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUserById(id: number) {
    return this.httpClient.get<any>(`${BASE_PATH}/user/${id}`);
  }

  // gets all users with role ROLE_DOCTOR
  getAllDoctors() {
    return this.httpClient.get<any>(`${BASE_PATH}/user/doctors`);
  }

  // gets all users with role ROLE_USER
  getAllUsers() {
    return this.httpClient.get<any>(`${BASE_PATH}/user/users`);
  }

  setEnabled(id: number, enable) {
    return this.httpClient.put<any>(`${BASE_PATH}/user/enabled/${id}`, enable);
  }


}
