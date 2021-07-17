import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  token= localStorage.getItem('token')
  constructor(private httpClient: HttpClient) {}
  
  updatepassword(data) {
    return this.httpClient.put<any>(
      `${BASE_PATH}/user/forgotPassword?token=${data.username+this.token}`,
      data
    );
  }
}
