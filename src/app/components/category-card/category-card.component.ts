import { Component, input } from '@angular/core';
import { ICategory } from '../../core/models/category.model';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [ButtonModule, RouterLink, TranslateModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  category = input.required<ICategory>();
}
