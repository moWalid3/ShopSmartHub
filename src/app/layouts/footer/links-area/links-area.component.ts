import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-links-area',
  standalone: true,
  imports: [RouterLink, TranslateModule, InputTextModule, ButtonModule],
  templateUrl: './links-area.component.html',
  styleUrl: './links-area.component.scss',
  host: {
    'class': 'block py-6'
  }
})
export class LinksAreaComponent {
  categoriesService = inject(CategoriesService);

  moreLinks = [
    {
      headTitle: 'footer.links.letUsHelpYou',
      links: [
        {
          title: 'footer.links.yourOrders',
          route: '/allorders'
        },
        {
          title: 'footer.links.yourCart',
          route: '/cart'
        },
        {
          title: 'footer.links.yourWishlist',
          route: '/wishlist'
        },
      ]
    },
    {
      headTitle: 'footer.links.getToKnowUs',
      links: [
        {
          title: 'footer.links.aboutUs',
          route: '/faq'
        },
        {
          title: 'footer.links.faqs',
          route: '/faq'
        },
        {
          title: 'footer.links.helpAndContact',
          route: '/contact'
        },
      ]
    }
  ]
}
