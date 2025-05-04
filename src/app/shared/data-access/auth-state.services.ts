import { inject, Injectable } from '@angular/core';
import { Auth, authState, getAuth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  fireauth = inject(Auth);

  get authState$(): Observable<any> {
    return authState(this.fireauth);
  }

  get currentUser() {
    return getAuth().currentUser;
  }

  logout() {
    return signOut(this.fireauth);
  }
}
