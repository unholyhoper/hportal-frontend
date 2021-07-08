import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let jwt = JSON.parse(localStorage.getItem('jwt'));
        let headers= request.headers.append('Authorization', `Bearer ${jwt.token}`)
        if (jwt) {
            request = request.clone({
                headers:headers,
            });
        }
        return next.handle(request);
    }

}