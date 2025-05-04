import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

interface formulario {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, GoogleButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export default class SignInComponent {
  _formulariobuilder = inject(FormBuilder);
  _router = inject(Router);
  _authservice = inject(AuthService);

  public _FormularioGroup: FormGroup =
    this._formulariobuilder.group<formulario>({
      email: this._formulariobuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this._formulariobuilder.control('', [Validators.required]),
    });

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this._FormularioGroup);
  }

  hasEmailError() {
    return hasEmailError(this._FormularioGroup);
  }

  async submitform() {
    if (this._FormularioGroup.invalid) {
      return;
    }
    const email = this._FormularioGroup.get('email')?.value;
    const password = this._FormularioGroup.get('password')?.value;
    //const { email, password } = this._FormularioGroup.value;

    try {
      await this._authservice.signin({ email, password });
      this._router.navigateByUrl('/character');
      console.log('Usuario generado correctamente');
    } catch (error) {
      console.error(error);
    }
  }

  async signingwithgoogle() {
    try {
      this._authservice.signinwithgoogle();
      console.log('Usuario generado correctamente');
    } catch (error) {
      console.log(error);
    }
  }
}
