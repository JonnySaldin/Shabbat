import { Component } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast" *ngIf="toastService.message$ | async as message">
      {{ message }}
    </div>
  `,
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
