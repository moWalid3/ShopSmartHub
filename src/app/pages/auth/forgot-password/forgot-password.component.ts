import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  host: {
    class: 'container',
  },
})
export class ForgotPasswordComponent {}
