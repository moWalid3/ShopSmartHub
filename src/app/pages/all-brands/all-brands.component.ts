import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-brands',
  standalone: true,
  imports: [BreadcrumbModule, TranslateModule, RouterLink],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.scss',
  host: {
    'class': 'block container'
  }
})
export class AllBrandsComponent {
  brandsService = inject(BrandsService);
}
