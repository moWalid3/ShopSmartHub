import { Component, inject } from '@angular/core';
import { CategoryCardComponent } from "../../components/category-card/category-card.component";
import { CategoriesService } from '../../core/services/categories/categories.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [CategoryCardComponent, BreadcrumbModule, TranslateModule],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.scss',
  host: {
    'class': 'block container'
  }
})
export class AllCategoriesComponent {
  categoriesService = inject(CategoriesService);
}
