import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PokemonListComponent,
    PokemonItemComponent
  ]
})
export class PokemonModule { }
