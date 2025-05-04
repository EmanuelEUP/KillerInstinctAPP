import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
    canActivateChild: [publicGuard],
  },
  {
    path: 'character',
    loadComponent: () =>
      import('./shared/ui/layout.component').then((c) => c.LayoutComponent),
    loadChildren: () => import('./characters/feature/character.routes'),
    canActivateChild: [privateGuard],
  },
];
