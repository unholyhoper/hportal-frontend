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


}
