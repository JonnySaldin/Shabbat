import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private afs: AngularFirestore) {}

  async saveSelectedDates(dates: string[]) {
    const ref = this.afs.collection('reservations').doc('calendar');
    await ref.set({ dates });
  }

  async getSelectedDates(): Promise<string[]> {
    const ref = this.afs.collection('reservations').doc('calendar');
    const snapshot = await firstValueFrom(ref.get());
    const data = snapshot.data() as { dates?: string[] } | undefined;
    return snapshot.exists && data?.dates ? data.dates : [];
  }
}
