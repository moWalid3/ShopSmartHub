import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ISuccessAuth, IUser } from '../../models/auth.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private userToken = signal('');
  isAuthenticated = computed(() => !!this.userToken());
  token = computed(() => this.userToken());
  userId = computed(() => jwtDecode<{id: string}>(this.token())?.id || '');

  login(data: {email: string, password: string}) {
    return this.http.post<ISuccessAuth>('https://ecommerce.routemisr.com/api/v1/auth/signin', data).pipe(
      tap(res => this.successAuth(res.token))
    )
  }

  register(user: IUser) {
    return this.http.post<ISuccessAuth>('https://ecommerce.routemisr.com/api/v1/auth/signup', user).pipe(
      tap(res => this.successAuth(res.token))
    );
  }

  forgotPassword(email: string) {
    return this.http.post<{statusMsg: string, message: string}>('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {email})
  }

  verifyResetCode(resetCode: string) {
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {resetCode})
  }

  resetPassword(email: string, newPassword: string) {
    return this.http.put<{token: string}>('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {email, newPassword}).pipe(
      tap(res => this.successAuth(res.token))
    )
  }

  logout() {
    localStorage.removeItem('SSHToken');
    this.userToken.set('');
  }

  checkAuthenticated() {
    if(localStorage.getItem('SSHToken'))
      this.userToken.set(localStorage.getItem('SSHToken')!);
  }

  private successAuth(token: string) {
    this.userToken.set(token);
    localStorage.setItem('SSHToken', this.userToken());
    this.router.navigate(['/']);
  }
}
