import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { ProductsViewComponent } from "./products-view/products-view.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [BreadcrumbModule, ProductsViewComponent, TranslateModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
  host: {
    'class': 'block container'
  }
})
export class AllProductsComponent {
  // items: MenuItem[] = [{label: 'Products'}];
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'};
}
