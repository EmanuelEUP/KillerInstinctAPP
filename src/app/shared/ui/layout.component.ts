import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.services';

@Component({
  selector: 'Layout-component',
  templateUrl: './layout.component.html',
  imports: [RouterOutlet],
  standalone: true,
})
export class LayoutComponent {
  authstate = inject(AuthStateService);
  router = inject(Router);

  async logout() {
    await this.authstate.logout();
    this.router.navigateByUrl('/auth/sign-in');
  }
}
