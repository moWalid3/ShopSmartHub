import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ISuccessAuth, IUser } from '../../models/auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private userToken = signal('');
  isAuthenticated = computed(() => !!this.userToken());

  login(data: {email: string, password: string}) {
    return this.http.post<ISuccessAuth>('https://ecommerce.routemisr.com/api/v1/auth/signin', data).pipe(
      tap(res => {
        this.userToken.set(res.token);
        localStorage.setItem('SSHToken', this.userToken());
      })
    )
  }

  register(user: IUser) {
    return this.http.post<ISuccessAuth>('https://ecommerce.routemisr.com/api/v1/auth/signup', user).pipe(
      tap(res => {
        this.userToken.set(res.token);
        localStorage.setItem('SSHToken', this.userToken());
      })
    );
  }

  forgotPassword(email: string) {
    return this.http.post<{statusMsg: string, message: string}>('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {email})
  }

  verifyResetCode(resetCode: string) {
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {resetCode})
  }

  logout() {
    localStorage.removeItem('SSHToken');
    this.userToken.set('');
  }

  checkAuthenticated() {
    if(localStorage.getItem('SSHToken'))
      this.userToken.set(localStorage.getItem('SSHToken')!);
  }
}
