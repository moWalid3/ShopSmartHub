import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { LanguageService } from '../../../core/services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-middle-header',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './middle-header.component.html',
  styleUrl: './middle-header.component.scss',
  host: {
    class: 'surface-section',
  },
})
export class MiddleHeaderComponent {
  languageService = inject(LanguageService);
  countries: any[] | undefined;
  country: any;

  filteredCountries: any[] | undefined;

  ngOnInit() {
    this.countries = [
      {
        name: 'Afghanistan',
        code: 'AF',
      },
      {
        name: 'Egypt',
        code: 'EG',
      },
      {
        name: 'Yemen',
        code: 'YE',
      },
      {
        name: 'Algeria',
        code: 'AL',
      },
    ];
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  categories = ['mobile', 'man', 'women'];
  selectedCategory: any;
}
