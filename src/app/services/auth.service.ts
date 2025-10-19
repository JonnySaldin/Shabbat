import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;

    // keep BehaviorSubject synced with Firebase auth state
    this.user$.subscribe((user) => {
      this.isLoggedIn$.next(!!user);
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }
}
