import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth,getAuth} from '@angular/fire/auth';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { provideHttpClient, withInterceptors } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyBbqguzXNCSYpgXynEzrYjaTOctKu9RQ7Y",
  authDomain: "pharma-c6ac8.firebaseapp.com",
  projectId: "pharma-c6ac8",
  storageBucket: "pharma-c6ac8.firebasestorage.app",
  messagingSenderId: "566532802030",
  appId: "1:566532802030:web:4b953c886ef8bea3abbaff",
  measurementId: "G-Q8PH2GC0J4"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
    ]), provideAnimationsAsync()

  ]
};
