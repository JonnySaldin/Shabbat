import { Component, OnInit } from '@angular/core';
import { LanguageServiceService } from './services/language-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'shabbat-website';
  isLoggedIn = false;
  showLoginModal = false;
  loginForm: FormGroup;
  loginError = '';

  showMobileMenu = false;

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

  ngOnInit() {
    // ✅ Track Firebase auth state
    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.showLoginModal = false; // ensure modal closes on successful login
      }
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  toggleLogin() {
    this.showLoginModal = !this.showLoginModal;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      await this.authService.login(email, password);
      this.loginError = '';
      // modal auto closes via ngOnInit subscription
    } catch (error: any) {
      this.loginError = 'Invalid credentials';
      console.error(error);
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
