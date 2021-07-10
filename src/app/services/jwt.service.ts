import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../model/login-user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
const BASE_PATH = environment.basePath;

@Injectable({ providedIn: 'root' })
export class AuthService {
    static getToken(): string {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    constructor(private http: HttpClient, private router: Router,     private toastr: ToastrService
        ) { }
    login(username: string, password: string) {
       return this.http.post(`${BASE_PATH}/login_check`, {username,password})
    }


}