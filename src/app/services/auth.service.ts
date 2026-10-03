import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
}

export interface StudentRegistration {
  name: string;
  rollNo: string;
  password?: string;
  hostelName: string;
  roomNo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(rollNo: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { rollNo, password }).pipe(
      tap(res => {
        localStorage.setItem('student_token', res.token);
        localStorage.setItem('role', 'student');
        localStorage.setItem('rollNo', rollNo);
      })
    );
  }

  signUp(student: StudentRegistration): Observable<any> {
    return this.http.post(`${this.baseUrl}/addStudent`, student);
  }

  adminLogin(password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/admin/login`, { password }).pipe(
      tap(res => {
        localStorage.setItem('admin_token', res.token);
        localStorage.setItem('role', 'admin');
      })
    );
  }

  setupAdminPassword(password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/admin/setup-password`, { password }, { responseType: 'text' });
  }

  getStudentToken(): string | null {
    return localStorage.getItem('student_token');
  }

  getAdminToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  getActiveToken(): string | null {
    const role = this.getRole();
    if (role === 'admin') {
      return this.getAdminToken();
    }
    return this.getStudentToken();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getRollNo(): string | null {
    return localStorage.getItem('rollNo');
  }

  isStudentLoggedIn(): boolean {
    return !!this.getStudentToken();
  }

  isAdminLoggedIn(): boolean {
    return !!this.getAdminToken();
  }

  isLoggedIn(): boolean {
    return this.isStudentLoggedIn() || this.isAdminLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('student_token');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('role');
    localStorage.removeItem('rollNo');
  }
}
