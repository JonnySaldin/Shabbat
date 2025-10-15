import { Component } from '@angular/core';
import { LanguageServiceService } from '../services/language-service.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.css',
})
export class FacilitiesComponent {
  constructor(public languageService: LanguageServiceService) {}
}
