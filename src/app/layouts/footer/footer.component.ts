import { Component } from '@angular/core';
import { ServicesAreaComponent } from "./services-area/services-area.component";
import { LinksAreaComponent } from "./links-area/links-area.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ServicesAreaComponent, LinksAreaComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

}
