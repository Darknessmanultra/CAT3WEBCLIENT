import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5018/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  // Verifica si hay un token en el localStorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Observable para saber si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Registro
  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Login
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        this.isLoggedInSubject.next(true);
        return response;
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
