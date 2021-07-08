import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
     headers: any;
     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        if (jwt) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt.token}`
                }
            });
        }
        return next.handle(request);
    }

}