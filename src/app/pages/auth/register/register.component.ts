import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MessagesModule } from 'primeng/messages';
import { ValidationFieldComponent } from "../../../components/validation-field/validation-field.component";
import { InputMaskModule } from 'primeng/inputmask';
import { IUser } from '../../../core/models/auth.model';
import { MessageService } from 'primeng/api';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

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
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  loading = signal(false);
  errorMsg = signal('');

  registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    rePassword: new FormControl<string>('', [Validators.required, Validators.pattern(/^[A-Z].{5,}/)]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators: this.matchPasswords});

  matchPasswords(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('rePassword');
    if(password?.value === rePassword?.value) {
      return null;
    } else {
      rePassword?.setErrors({matchPasswords: 'Passwords do not match.'})
      return {matchPasswords: 'Passwords do not match.'};
    }
  }

  onRegister() {
    if(this.registerForm.valid) {
      this.loading.set(true);

      const user: IUser = {
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        rePassword: this.registerForm.value.rePassword!,
        phone: this.registerForm.value.phone!,
      }

      this.authService.register(user).subscribe({
        next: res => {
          this.loading.set(false);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('auth.accountCreationSuccessful')});
          this.cartService.getCartProducts().subscribe();
          this.wishlistService.getWishlistProducts().subscribe();
        },
        error: err => {
          this.loading.set(false);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }
}
