import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslateModule, BreadcrumbModule, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  host: {
    'class': 'container'
  }
})
export class ContactComponent {

}
