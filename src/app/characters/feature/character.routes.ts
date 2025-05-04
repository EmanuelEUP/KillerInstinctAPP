import { Routes } from '@angular/router';

export default [
  {
    path: 'list',
    loadComponent: () =>
      import('./character-list/character-list.component').then(
        (c) => c.CharacterListComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () => import('./character-add/character-add.component'),
  },
  {
    path: 'add/:id',
    loadComponent: () => import('./character-add/character-add.component'),
  },
] as Routes;
