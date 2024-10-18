import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ValidationFieldComponent } from '../../../../components/validation-field/validation-field.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    TranslateModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    ValidationFieldComponent,
    PasswordModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');

  resetPasswordForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    newPassword: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
  });

  onResetPassword() {
    if(this.resetPasswordForm.valid) {
      this.loading.set(true);

      this.authService.resetPassword(this.resetPasswordForm.value.email!, this.resetPasswordForm.value.newPassword!).subscribe({
        next: res => {
          this.loading.set(false);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('auth.passwordChangeSuccessful') })
        },
        error: err => {
          this.loading.set(false);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }
}
