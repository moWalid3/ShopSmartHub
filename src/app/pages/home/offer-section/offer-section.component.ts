import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-offer-section',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './offer-section.component.html',
  styleUrl: './offer-section.component.scss'
})
export class OfferSectionComponent {
  offers = [
    {
      title: 'home.offer.computerAndGaming',
      img: 'offer/watch.png',
      color: 'blue'
    },
    {
      title: 'home.offer.homeElectronics',
      img: 'offer/home.png',
      color: 'orange'
    },
    {
      title: 'home.offer.mobileAccessories',
      img: 'offer/mobile.png',
      color: 'green'
    },
  ];
}
