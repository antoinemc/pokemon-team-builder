import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Pokemon {
  pokedex_id: number,
  name: string,
  sprite: string,
}

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

constructor() {}
private http = inject(HttpClient);
private API_URL = 'https://tyradex.app/api/v1/gen/1';

private pokemonListSignal = signal<Pokemon[]>([]);
public pokemonList = this.pokemonListSignal.asReadonly();

private pokemonPickedListSignal = signal<Pokemon[]>([]);
public pokemonPickedList = this.pokemonPickedListSignal.asReadonly();

getPokemonList(): void {
  this.http.get<Pokemon[]>(this.API_URL)
  .subscribe((pokemon: any[]) => {
    const pokemonSimplifiedList: Pokemon[] = pokemon.map(pok => ({
      pokedex_id: pok.pokedex_id,
      name: pok.name.fr || pok.name.en,
      sprite: pok.sprites?.regular || pok.sprite?.regular,
    }));
    this.pokemonListSignal.set(pokemonSimplifiedList);
    });
  }

  addPokemon(pokemon: Pokemon): void {
    if (this.pokemonPickedList().length >= 6) {
      return;
    };
    if (!this.pokemonPickedList().some(p => p.pokedex_id === pokemon.pokedex_id)) {
      this.pokemonPickedListSignal.update(list => [...list, pokemon]);
    }
  }

  removePokemon(pokedexId: number): void {
    this.pokemonPickedListSignal.update(list =>
      list.filter(p => p.pokedex_id !== pokedexId)
    );
  }

  isPicked(pokedexId: number): boolean {
    return this.pokemonPickedList().some(p => p.pokedex_id === pokedexId);
  }
}
