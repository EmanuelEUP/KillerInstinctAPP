import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  auth = inject(Auth);

  signup(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  signin(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  signinwithgoogle() {
    const GoogleProvider = new GoogleAuthProvider();

    //GoogleProvider.setCustomParameters({ prompt: 'select_account' });

    return signInWithPopup(this.auth, GoogleProvider);
  }
}
