import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageServiceService } from '../services/language-service.service';
import { AuthService } from '../services/auth.service';
import { ReservationsService } from '../services/reservations.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  currentDate = new Date();
  weeks: any[][] = [];
  selectedDates = new Set<string>();
  isLoading = false;
  isLoggedIn = false;
  dayNames: string[] = [];
  monthLabel = ''; // <-- month label shown in the header

  private authSub?: Subscription;
  private langSub?: Subscription;
  private isBrowser: boolean;

  constructor(
    public languageService: LanguageServiceService,
    private authService: AuthService,
    private toastService: ToastService,
    private reservationsService: ReservationsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    // Auth subscription (unchanged)
    this.authSub = this.authService.user$.subscribe((user) => {
      const wasLoggedIn = this.isLoggedIn;
      this.isLoggedIn = !!user;
      if (!wasLoggedIn && this.isLoggedIn)
        this.toastService.show('Logged in successfully!');
      else if (wasLoggedIn && !this.isLoggedIn)
        this.toastService.show('Logged out successfully!');
    });

    // Language subscription: update both day names and month label whenever language toggles
    this.langSub = this.languageService.isEnglish$.subscribe((isEnglish) => {
      // day names
      this.dayNames = isEnglish
        ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // update month label right away
      this.updateMonthLabel();
    });

    // initial calendar + label
    this.generateCalendar();
    this.updateMonthLabel();
    this.loadSavedDates();
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  // --- small helper to choose locale
  private getLocale(): string {
    return this.languageService.isEnglish$.value ? 'es-ES' : 'en-US';
  }

  // --- update the monthLabel using the current date + current locale
  private updateMonthLabel() {
    const locale = this.getLocale();
    // Use toLocaleString to get e.g. "October 2025" or "octubre 2025"
    // month: 'long' gives full month name
    this.monthLabel = this.currentDate.toLocaleString(locale, {
      month: 'long',
      year: 'numeric',
    });
    // ensure first char capitalized if needed (optional)
    // this.monthLabel = this.monthLabel.charAt(0).toUpperCase() + this.monthLabel.slice(1);
  }

  async loadSavedDates() {
    if (!this.isBrowser) return;
    this.isLoading = true;
    try {
      const savedDates = await this.reservationsService.getSelectedDates();
      this.selectedDates = new Set(savedDates);
    } catch (err) {
      console.error('Error loading saved dates:', err);
    } finally {
      this.isLoading = false;
    }
  }

  async toggleDate(date: Date) {
    if (!this.isLoggedIn) {
      this.toastService.show('Please log in to manage reservations.');
      return;
    }
    const dateStr = date.toISOString().split('T')[0];
    if (this.selectedDates.has(dateStr)) this.selectedDates.delete(dateStr);
    else this.selectedDates.add(dateStr);
    await this.saveDates();
  }

  async saveDates() {
    if (!this.isBrowser) return;
    this.isLoading = true;
    try {
      await this.reservationsService.saveSelectedDates(
        Array.from(this.selectedDates)
      );
      this.toastService.show('Reservations updated!');
    } catch (err) {
      console.error('Error saving selected dates:', err);
    } finally {
      this.isLoading = false;
    }
  }

  prevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
    this.updateMonthLabel(); // update after changing month
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
    this.updateMonthLabel(); // update after changing month
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: any[][] = [];
    let currentWeek: any[] = [];

    for (let i = 0; i < firstDay.getDay(); i++) currentWeek.push(null);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push(date);
      if (date.getDay() === 6 || day === lastDay.getDate()) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    this.weeks = weeks;
  }

  isSelected(date: Date): boolean {
    return this.selectedDates.has(date.toISOString().split('T')[0]);
  }
}
