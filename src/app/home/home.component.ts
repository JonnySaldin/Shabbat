import { Component } from '@angular/core';
import { LanguageServiceService } from '../services/language-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public languageService: LanguageServiceService) {}
}
