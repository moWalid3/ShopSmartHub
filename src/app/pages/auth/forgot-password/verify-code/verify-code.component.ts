import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { InputOtpModule } from 'primeng/inputotp';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    InputOtpModule,
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');

  resetCodeForm = new FormGroup({
    resetCode: new FormControl<string>('', [Validators.required, Validators.pattern(/^.{6}$/)])
  });

  onResetCode() {
    if(this.resetCodeForm.controls.resetCode.valid) {
      this.loading.set(true);
      this.authService.verifyResetCode(this.resetCodeForm.value.resetCode!).subscribe({
        next: res => {
          this.loading.set(false);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('auth.verificationSuccessful') })
          this.router.navigate(['/forgot-password/reset-password'])
        },
        error: err => {
          this.loading.set(false);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }
}
