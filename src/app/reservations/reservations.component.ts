import { Component } from '@angular/core';
import { LanguageServiceService } from '../services/language-service.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  currentDate = new Date();
  weeks: any[][] = [];
  selectedDates = new Set<string>(); // store selected days (as 'YYYY-MM-DD')

  constructor(public languageService: LanguageServiceService) {}

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: any[][] = [];

    let currentWeek: any[] = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(null);
    }

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

  prevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  toggleDate(date: Date) {
    const dateStr = date.toISOString().split('T')[0];
    if (this.selectedDates.has(dateStr)) {
      this.selectedDates.delete(dateStr);
    } else {
      this.selectedDates.add(dateStr);
    }
  }

  isSelected(date: Date): boolean {
    return this.selectedDates.has(date.toISOString().split('T')[0]);
  }
}
