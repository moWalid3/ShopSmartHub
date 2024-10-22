import { Component, inject, signal } from '@angular/core';
import { IOrder } from '../../core/models/order.model';
import { OrdersService } from '../../core/services/orders/orders.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TranslateModule,
    ButtonModule,
    SkeletonModule,
    TableModule,
    DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  host: {
    'class': 'block container',
  }
})
export class OrdersComponent {
  private ordersService = inject(OrdersService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  allOrders = signal<IOrder[]>([]);
  endResponse = signal(false);

  ngOnInit(): void {
    this.getOrders(this.authService.userId());
  }

  getOrders(cartOwner: string) {
    this.ordersService.getUserOrders(cartOwner).subscribe({
      next: res => {
        this.allOrders.set(res);
        this.endResponse.set(true);
      },
      error: err => {
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
        this.endResponse.set(true);
      }
    })
  }

  private handleErrorResponse(errorMsg = "Failed to fetch") {
    this.messageService.add({ severity: 'error', summary: errorMsg})
  }
}
