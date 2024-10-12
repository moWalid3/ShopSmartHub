import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [TagModule, ButtonModule, TranslateModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  host: {
    'class': 'block surface-ground'
  }
})
export class LandingComponent {

}