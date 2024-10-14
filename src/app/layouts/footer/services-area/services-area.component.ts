import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-services-area',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './services-area.component.html',
  styleUrl: './services-area.component.scss',
  host: {
    'class': 'grid py-6 border-bottom-1 border-200'
  }
})
export class ServicesAreaComponent {
  services = [
    {
      title: 'footer.services.fastDelivery',
      description: 'footer.services.experienceLightningFastDelivery'
    },
    {
      title: 'footer.services.securedPayment',
      description: 'footer.services.shopWithConfidence'
    },
    {
      title: 'footer.services.moneyBack',
      description: 'footer.services.moneyBackGuarantee'
    },
    {
      title: 'footer.services.support247',
      description: 'footer.services.alwaysHereForYou'
    },
  ]
}
