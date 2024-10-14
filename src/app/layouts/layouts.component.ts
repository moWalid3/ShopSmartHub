import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ScrollTopModule } from 'primeng/scrolltop';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ScrollTopModule, FooterComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {

}
