import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-testme',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './testme.component.html',
  styleUrl: './testme.component.scss'
})
export class TestmeComponent {

}
