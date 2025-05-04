import { Component, input } from '@angular/core';
import {
  CharacterService,
  Character,
} from '../../data-access/character.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  _Character = input.required<Character[]>();
}
