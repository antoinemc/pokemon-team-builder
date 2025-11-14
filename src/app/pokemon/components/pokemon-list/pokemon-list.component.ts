import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { Pokemon, PokemonService } from './../../services/pokemon.service';
import { Component, inject, Inject, OnInit, signal, Signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  imports: [PokemonItemComponent],
})
export class PokemonListComponent implements OnInit {

  private pokemonService = inject(PokemonService);

  pokemonList: Signal<Pokemon[]> = this.pokemonService.pokemonList;
  pokemonPickedList: Signal<Pokemon[]> = this.pokemonService.pokemonPickedList;
  
  constructor() {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList();
  }
}
