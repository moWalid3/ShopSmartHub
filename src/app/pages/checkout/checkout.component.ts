import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ValidationFieldComponent } from '../../components/validation-field/validation-field.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckoutService } from '../../core/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    TranslateModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
    ValidationFieldComponent,
    BreadcrumbModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  host: {
    'class': 'block container'
  }
})
export class CheckoutComponent {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private checkoutService = inject(CheckoutService);
  payOnDeliveryLoading = signal(false);
  payOnlineLoading = signal(false);

  checkoutForm = new FormGroup({
    details: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl<string>('', [Validators.required])
  });

  onPayOnDelivery() {
    if(this.checkoutForm.valid) {
      const data = {
        details: this.checkoutForm.value.details!,
        phone: this.checkoutForm.value.phone!,
        city: this.checkoutForm.value.city!
      }

      this.payOnDeliveryLoading.set(true);
      this.checkoutService.createCashOrder(data).subscribe({
        next: res => {
          this.payOnDeliveryLoading.set(false);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('checkout.orderSuccessful')})
          this.router.navigate(['/allorders']);
        },
        error: err => {
          this.payOnDeliveryLoading.set(false);
          this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
        }
      })
    }
  }

  onPayOnline() {
    if(this.checkoutForm.valid) {
      const data = {
        details: this.checkoutForm.value.details!,
        phone: this.checkoutForm.value.phone!,
        city: this.checkoutForm.value.city!
      }

      this.payOnlineLoading.set(true);
      this.checkoutService.checkoutSessionOnline(data).subscribe({
        next: res => {
          this.payOnlineLoading.set(false);
          window.location.href = res.session.url;
        },
        error: err => {
          this.payOnlineLoading.set(false);
          this.handleErrorResponse(err.error?.message || err.error?.errors?.msg);
        }
      })
    }
  }

  private handleErrorResponse(errorMsg = "Failed to fetch") {
    this.messageService.add({ severity: 'error', summary: errorMsg})
  }
}
