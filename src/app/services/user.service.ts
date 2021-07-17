import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  // gets all users with role ROLE_DOCTOR
  getAllDoctors() {
    return this.httpClient.get<any>(`${BASE_PATH}/user/doctors`);
  }

  setEnabled(id: number, enable) {
    return this.httpClient.put<any>(`${BASE_PATH}/user/enabled/${id}`, enable);
  }


  getUserById(id: number) {
    return this.httpClient.get<any>(`${BASE_PATH}/user/${id}`);
  }

  getCurrentUser() {
    return this.httpClient.get<any>(`${BASE_PATH}/currentUser`);
  }

  // gets all users with role ROLE_USER
  getAllUsers() {
    return this.httpClient.get<any>(`${BASE_PATH}/users`);
  }

  updateCurrentUser(id: number) {
    return this.httpClient.put<any>(`${BASE_PATH}/user/${id}`, "");
  }

  getAllDelegates() {
    return this.httpClient.get<any>(`${BASE_PATH}/user/delegates`);
  }
}
