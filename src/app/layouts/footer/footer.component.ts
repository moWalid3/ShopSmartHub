import { Component } from '@angular/core';
import { ServicesAreaComponent } from "./services-area/services-area.component";
import { LinksAreaComponent } from "./links-area/links-area.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ServicesAreaComponent, LinksAreaComponent, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

}
