/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';

import { PokemonListComponent } from './pokemon-list.component';
import { Pokemon, PokemonService } from '../../services/pokemon.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideToastr, ToastNoAnimation } from 'ngx-toastr';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  const mockPokemonList: Pokemon[] = [{ pokedex_id: 1, name: 'Bulbizarre', sprite: 'bulba.png' }];

  mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonList', 'addPokemon', 'removePokemon', 'isPicked'], {
    pokemonList: signal<Pokemon[]>(mockPokemonList),
    pokemonPickedList: signal<Pokemon[]>([]),
  });


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ PokemonListComponent ],
      providers: [
         provideHttpClient(),
         provideHttpClientTesting(),
         provideZonelessChangeDetection(),
        provideToastr({
          toastComponent: ToastNoAnimation, 
          positionClass: 'toast-bottom-left',
          timeOut: 5000,
          progressAnimation: 'decreasing',
          closeButton: true,
        }),
        { provide: PokemonService, useValue: mockPokemonService }
      ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPokemonList() on Init', () => {
    expect(mockPokemonService.getPokemonList).toHaveBeenCalled();
  });

  it('should set pokemonList and pokemonPickedList', () => {
    expect(component.pokemonList()).toEqual(mockPokemonList);
    expect(component.pokemonPickedList()).toEqual([]);
  });


});
