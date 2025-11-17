import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { Pokemon, PokemonService } from './../../services/pokemon.service';
import { Component, inject, OnInit, Signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  imports: [PokemonItemComponent],
})
export class PokemonListComponent implements OnInit {

  private pokemonService = inject(PokemonService);

  private loading = true;

  pokemonList: Signal<Pokemon[]> = this.pokemonService.pokemonList;
  pokemonPickedList: Signal<Pokemon[]> = this.pokemonService.pokemonPickedList;
  
  ngOnInit(): void {
    if (this.loading) {
      this.pokemonService.getPokemonList();
      this.loading = false;
    }
  }
}
