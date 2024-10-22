import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [TranslateModule, BreadcrumbModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  host: {
    'class': 'container'
  }
})
export class FaqComponent {
  questions = [
    {title: 'faq.chooseLaptop', ans: 'faq.selectingLaptop'},
    {title: 'faq.ledOledDifferenceQ', ans: 'faq.ledOledDifferenceA'},
    {title: 'faq.deviceProtectionQ', ans: 'faq.deviceProtectionA'},
    {title: 'faq.homeAudioEnhancementQ', ans: 'faq.homeAudioEnhancementA'},
    {title: 'faq.techSupportQ', ans: 'faq.techSupportA'},
    {title: 'faq.onlineShoppingQ', ans: 'faq.onlineShoppingA'},
    {title: 'faq.freshProduceQ', ans: 'faq.freshProduceA'},
    {title: 'faq.dietaryOptionsQ', ans: 'faq.dietaryOptionsA'},
    {title: 'faq.loyaltyProgramQ', ans: 'faq.loyaltyProgramA'},
    {title: 'faq.provideFeedbackQ', ans: 'faq.provideFeedbackA'},
  ]
}
