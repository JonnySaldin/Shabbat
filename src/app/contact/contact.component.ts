import { Component } from '@angular/core';
import { LanguageServiceService } from '../services/language-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(public languageService: LanguageServiceService) {}
}
