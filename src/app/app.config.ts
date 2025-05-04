import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'kinst-49897',
        appId: '1:675872117533:web:1204220eab566d46b347f4',
        storageBucket: 'kinst-49897.firebasestorage.app',
        apiKey: 'AIzaSyAjDJpNk7Shuf69RxEZuZPcd4whGp7wQQg',
        authDomain: 'kinst-49897.firebaseapp.com',
        messagingSenderId: '675872117533',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
