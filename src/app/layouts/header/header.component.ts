import { Component } from '@angular/core';
import { TopHeaderComponent } from './top-header/top-header.component';
import { MiddleHeaderComponent } from "./middle-header/middle-header.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TopHeaderComponent, MiddleHeaderComponent, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
