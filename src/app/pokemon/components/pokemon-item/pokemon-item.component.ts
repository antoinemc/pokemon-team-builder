import { Component, Inject, OnInit, inject, input } from '@angular/core';
import { Pokemon, PokemonService } from '../../services/pokemon.service';

@Component({
  standalone: true,
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
  public pokemonService = inject(PokemonService);
  pokemon = input<Pokemon>({} as Pokemon);
  

  constructor() {}

  ngOnInit() {
  }

  addPokemon(): void {
    this.pokemonService.addPokemon(this.pokemon());
  }

  deletePokemon(): void {
    this.pokemonService.removePokemon(this.pokemon().pokedex_id);
  }

  isPicked(): boolean {
    return this.pokemonService.isPicked(this.pokemon().pokedex_id);
  }

}
