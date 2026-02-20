import { Component } from '@angular/core';
import { LanguageServiceService } from '../services/language-service.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
})
export class DonateComponent {
  constructor(public languageService: LanguageServiceService) {}
}
