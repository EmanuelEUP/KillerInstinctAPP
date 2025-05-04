import { Component, inject } from '@angular/core';
import { TableComponent } from '../../ui/table/table.component';
import { RouterLink } from '@angular/router';
import { CharacterService } from '../../data-access/character.service';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [TableComponent, RouterLink],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent {
  CharacterData = inject(CharacterService).getCharacters;
}
