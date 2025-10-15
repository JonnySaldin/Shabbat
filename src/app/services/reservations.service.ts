import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  constructor(private firestore: Firestore) {}

  async saveSelectedDates(dates: string[]) {
    const docRef = doc(this.firestore, 'reservations', 'calendar');
    await setDoc(docRef, { dates });
  }

  async getSelectedDates(): Promise<string[]> {
    const docRef = doc(this.firestore, 'reservations', 'calendar');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data()['dates'] || [] : [];
  }
}
