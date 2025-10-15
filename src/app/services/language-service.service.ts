import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageServiceService {
  isEnglish$ = new BehaviorSubject<boolean>(true);

  toggleLanguage() {
    this.isEnglish$.next(!this.isEnglish$.value);
  }

  constructor() {}
}
