import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ValidationFieldComponent } from '../../../../components/validation-field/validation-field.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [
    TranslateModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    ValidationFieldComponent,
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');

  sendEmailForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
  });

  onSendEmail() {
    if(this.sendEmailForm.controls.email.valid) {
      this.loading.set(true);

      this.authService.forgotPassword(this.sendEmailForm.value.email!).subscribe({
        next: res => {
          this.loading.set(false);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('auth.resetCodeSent') })
          this.router.navigate(['/forgot-password/verify-code']);
        },
        error: err => {
          this.loading.set(false);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }
}
