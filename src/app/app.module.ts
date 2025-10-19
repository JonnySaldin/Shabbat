import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { ContactComponent } from './contact/contact.component';
import { ReservationsComponent } from './reservations/reservations.component';

// ✅ Import the compatibility modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { environment } from '../environments/environment';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FacilitiesComponent,
    ContactComponent,
    ReservationsComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // ✅ Classic Firebase setup for NgModule apps
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
