import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let jwt = this.authService.getJwt();

    if (jwt != null) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + jwt)
      });
      return next.handle(authRequest);
    }
    
    return next.handle(request);
  }
}
