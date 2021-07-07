import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUser } from '../model/login-user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const BASE_PATH = environment.basePath;

@Injectable({ providedIn: 'root' })
export class AuthService {
    // private loggedUserSubject: BehaviorSubject<LoginUser>;
    // public loggedInUser: Observable<any>;
    // getLoggedUser: any;

    constructor(private http: HttpClient, private router: Router) {
        // this.getLoggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        // this.loggedUserSubject = new BehaviorSubject(this.getLoggedUser);
        // this.loggedInUser = this.loggedUserSubject.asObservable();
    }

    // loginUser(cin: string, password: string) {
    //     return this.http.post<any>(`${BASE_PATH}/login`, { cin, password })
    //         .pipe(map(response=> {
    //             localStorage.setItem('loggedInUser', JSON.stringify(response));
    //             this.loggedUserSubject.next(response);
    //             console.log(response);
    //             return response;
    //         }));
    // }

    // logoutUser() {
    //     localStorage.removeItem('loggedInUser');
    //     this.loggedUserSubject.next(null);
    // }
    // public get loggedInUserValue(){
    //     return this.loggedUserSubject.value;
    // }
    
    login(cin: number, password: string): void {
       this.http.post(`${BASE_PATH}/api/login`, { cin, password })
            .pipe(
                map(response => {
                    console.log(response)
                    // login successful if there's a jwt token in the response
                    if (response) {
                        localStorage.setItem('jwt', JSON.stringify(response));
                        this.router.navigate(['/dashboard'])
                    }else
                    console.log('error')
                })
            );
    }

}