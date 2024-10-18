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
import { InputMaskModule } from 'primeng/inputmask';
import { IUser } from '../../../core/models/auth.model';

@Component({
  selector: 'app-register',
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
    InputMaskModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  host: {
    class: 'container',
  },
})
export class RegisterComponent {
  private authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');

  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    rePassword: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  });

  onLogin() {
    if(this.registerForm.valid) {
      this.loading.set(true);
      console.log(this.registerForm.value);

      const user: IUser = {
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        rePassword: this.registerForm.value.rePassword!,
        phone: this.registerForm.value.phone!,
      }

      this.authService.register(user).subscribe({
        next: res => {
          console.log(res);
          this.loading.set(false);
          console.log(this.authService.isAuthenticated());
          
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
