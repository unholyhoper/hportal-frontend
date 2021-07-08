import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../model/login-user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
const BASE_PATH = environment.basePath;

@Injectable({ providedIn: 'root' })
export class AuthService {
    static getToken(): string {
        return JSON.parse(localStorage.getItem('jwt'))
    }
    constructor(private http: HttpClient, private router: Router) { }
    login(username: string, password: string): void {
       this.http.post(`${BASE_PATH}/login_check`, {  password, username})
            .subscribe(response => {
                    console.log(response)
                    // login successful if there's a jwt token in the response
                    if (response) {
                        localStorage.setItem('jwt', JSON.stringify(response));
                        const token_decode = jwt_decode(JSON.stringify(response))
                        localStorage.setItem('userName',token_decode['username'])
                        localStorage.setItem('role',token_decode['roles'][0])
                        this.router.navigate(['/dashboard'])
                    }else
                    console.log('error')
                })
    }


}