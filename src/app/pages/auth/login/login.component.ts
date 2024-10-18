import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MessagesModule } from 'primeng/messages';
import { ValidationFieldComponent } from "../../../components/validation-field/validation-field.component";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslateModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
    PasswordModule,
    MessagesModule,
    ValidationFieldComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'container',
  },
})
export class LoginComponent {
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Z].{5,}/)])
  });

  onLogin() {
    if(this.loginForm.valid) {
      this.loading.set(true);

      const data = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      }

      this.authService.login(data).subscribe({
        next: res => {
          this.loading.set(false);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('auth.welcomeBackLoggedIn')})
        },
        error: err => {
          this.loading.set(false);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }
}
