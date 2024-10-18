import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MessagesModule } from 'primeng/messages';
import { ValidationFieldComponent } from "../../../components/validation-field/validation-field.component";
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-forgot-password',
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
    ValidationFieldComponent,
    InputOtpModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  host: {
    class: 'container',
  },
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');
  verifyResetCode = signal(false);
  successSentMsg = signal('');

  resetPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    resetCode: new FormControl<string>('', [Validators.required, Validators.pattern(/^.{6}$/)])
  });

  onSendEmail() {
    if(this.resetPasswordForm.controls.email.valid) {
      this.loading.set(true);
      this.authService.forgotPassword(this.resetPasswordForm.value.email!).subscribe({
        next: res => {
          console.log(res);
          this.loading.set(false);
          this.verifyResetCode.set(true);
          this.successSentMsg.set(res.message)
        },
        error: err => {
          console.log(err);
          this.loading.set(false);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }

  onResetCode() {
    if(this.resetPasswordForm.controls.resetCode.valid) {
      this.loading.set(true);
      this.authService.verifyResetCode(this.resetPasswordForm.value.resetCode!).subscribe({
        next: res => {
          console.log(res);
          this.loading.set(false);
          this.verifyResetCode.set(false);
        },
        error: err => {
          console.log(err);
          this.loading.set(false);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }
}
