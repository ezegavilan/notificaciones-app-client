import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoginRequest } from '../../clases/login-request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/clases/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlEndpoint: string;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() userEmail: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.urlEndpoint = 'http://localhost:8080/api/auth'
  }
  
  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post(`${this.urlEndpoint}/login`, loginRequest).pipe(
      map((response: any) => {
        sessionStorage.setItem('authToken', response.authResponse.authToken);
        sessionStorage.setItem('username', response.authResponse.username);
        sessionStorage.setItem('email', response.authResponse.email);
        sessionStorage.setItem('rol', response.authResponse.rol);
        sessionStorage.setItem('expiraEn', response.authResponse.expiraEn);

        this.loggedIn.emit(true);
        this.username.emit(response.authResponse.username);
        this.userEmail.emit(response.authResponse.email);

        return response.authResponse as AuthResponse;
      })
    );
  }

  logout(): void {
    sessionStorage.clear();
    this.loggedIn.emit(false);
    this.username.emit(null);
    this.userEmail.emit(null);
  }

  getJwt(): string {
    return sessionStorage.getItem('authToken');
  }

  getUsername(): string {
    return sessionStorage.getItem('username');
  }

  getUserEmail(): string {
    return sessionStorage.getItem('email');
  }

  isLoggedIn(): boolean {
    return this.getJwt() != null;
  }

  hasRole(role: string): boolean {
    return sessionStorage.getItem('rol') == role;
  }
}
