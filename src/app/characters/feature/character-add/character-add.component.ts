import { Component, inject, input, Input, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CharacterCreate,
  CharacterService,
  Character,
} from '../../data-access/character.service';
import { Router } from '@angular/router';
import { isRequired } from '../../../auth/utils/validators';

@Component({
  selector: 'app-character-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.scss',
})
export class CharacterAddComponent {
  _router = inject(Router);
  _CharacterService = inject(CharacterService);
  idcharacter = input.required<string>();

  formbuild = inject(FormBuilder);
  formulario = this.formbuild.group({
    id: this.formbuild.control('', Validators.required),
    name: this.formbuild.control('', Validators.required),
    description: this.formbuild.control('', Validators.required),
  });

  loading = signal(false);

  constructor() {
    if (this.idcharacter.toString().trim() != null) {
      this.getCharacter(this.idcharacter());
    }
  }

  async submit() {
    try {
      this.loading.set(true);
      if (this.formulario.invalid) {
        return;
      }

      const { name, description } = this.formulario.value;
      const character: CharacterCreate = {
        name: name || '',
        description: description || '',
      };

      if (this.idcharacter()) {
        await this._CharacterService.update(character, this.idcharacter());
      } else {
        await this._CharacterService.crear(character);
      }

      this._router.navigateByUrl('/list');
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.set(false);
    }
  }

  async getCharacter(id: string) {
    const taskSnapshot = await this._CharacterService.getCharacterbyID(id);

    if (!taskSnapshot.exists()) return;
    const Character = taskSnapshot.data() as Character;
    this.formulario.patchValue(Character);
  }
}
