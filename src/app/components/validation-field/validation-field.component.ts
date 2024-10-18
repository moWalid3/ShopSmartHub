import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-validation-field',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './validation-field.component.html',
  styleUrl: './validation-field.component.scss',
  host: {
    'class': 'block mb-3'
  }
})
export class ValidationFieldComponent {
  fieldControl = input.required<FormControl>();
  label = input<{value: string, for: string}>({value: '', for: ''});
  validations = input<{name: string, msg: string}[]>([]);
}
