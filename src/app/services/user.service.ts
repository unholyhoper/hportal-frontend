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

  getUserById(id: number) {
    return this.httpClient.get<any>(`${BASE_PATH}/user/${id}`);
  }

  getCurrentUser() {
    return this.httpClient.get<any>(`${BASE_PATH}/currentUser`);
  }

  getAllUsers() {
    return this.httpClient.get<any>(`${BASE_PATH}/users`);
  }

  updateCurrentUser(id: number) {
    return this.httpClient.put<any>(`${BASE_PATH}/user/${id}`, "");
  }
}
