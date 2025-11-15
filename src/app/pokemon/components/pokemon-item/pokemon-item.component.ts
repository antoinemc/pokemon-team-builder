import { Component, Inject, OnInit, inject, input } from '@angular/core';
import { Pokemon, PokemonService } from '../../services/pokemon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
  public pokemonService = inject(PokemonService);
  private toastrService = inject(ToastrService);
  pokemon = input<Pokemon>({} as Pokemon);
  

  constructor() {}

  ngOnInit() {
  }

  addPokemon(): void {
    this.pokemonService.addPokemon(this.pokemon());

      this.toastrService.success(`${this.pokemon().name} a été ajouté !`)
      if(this.pokemonService.isTeamFull) {
        this.toastrService.info('Bravo ! Vous êtes un excellent dresseur !', 'Votre équipe est complète')
      }
  }

  deletePokemon(): void {
    this.pokemonService.removePokemon(this.pokemon().pokedex_id);

    this.toastrService.success(`${this.pokemon().name} a été retiré !`)
    if(!this.pokemonService.teamSize) {
      this.toastrService.info('Attrapez les tous !', 'Votre équipe est vide ! ')
    }
  }

  isPicked(): boolean {
    return this.pokemonService.isPicked(this.pokemon().pokedex_id);
  }

}
