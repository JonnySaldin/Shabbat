import { Component } from '@angular/core';
import { LanguageServiceService } from './services/language-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'shabbat-website';
  loggedIn = false;
  loginForm: FormGroup;
  loginError = '';

  constructor(
    public languageService: LanguageServiceService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  toggleLogin() {
    this.loggedIn = !this.loggedIn;
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      await this.authService.login(email, password);
      this.loggedIn = false; // close modal
    } catch (error: any) {
      this.loginError = 'Invalid credentials';
      console.error(error);
    }
  }
}
