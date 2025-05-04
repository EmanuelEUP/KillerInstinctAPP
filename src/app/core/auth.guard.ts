import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { authState } from '@angular/fire/auth';
import { AuthStateService } from '../shared/data-access/auth-state.services';
import { map } from 'rxjs';

export const privateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return authState.authState$.pipe(
    map((state) => {
      if (!state) {
        router.navigateByUrl('/auth/sign-in');
        return false;
      }

      return true;
    })
  );
};

export const publicGuard: CanActivateFn = (childRoute, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return authState.authState$.pipe(
    map((state) => {
      if (state) {
        router.navigateByUrl('/character');
        return false;
      }

      return true;
    })
  );
};
