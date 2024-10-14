import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-hurry-up-section',
  standalone: true,
  imports: [ButtonModule, TranslateModule, RouterLink],
  templateUrl: './hurry-up-section.component.html',
  styleUrl: './hurry-up-section.component.scss',
})
export class HurryUpSectionComponent {

}
