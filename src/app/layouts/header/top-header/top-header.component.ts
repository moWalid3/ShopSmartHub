import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { TranslateModule } from '@ngx-translate/core';
import { ILang, LanguageService } from '../../../core/services/language/language.service';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DropdownModule, FormsModule, ButtonModule, TranslateModule],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss',
  host: {
    class: "border-bottom-1 border-primary bg-purple-800"
  }
})
export class TopHeaderComponent {
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);

  onSelectLanguage(event : {value: ILang}) {
    this.languageService.changeLanguage(event.value)
  }
}
