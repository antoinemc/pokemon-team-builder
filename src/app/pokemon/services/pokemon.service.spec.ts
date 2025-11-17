import { TestBed, inject } from '@angular/core/testing';
import { Pokemon, PokemonService } from './pokemon.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';


describe('Service: Pokemon', () => {
let service: PokemonService;
let httpMock: HttpTestingController;

const mockApiResponse = [
    {
      pokedex_id: 1,
      name: { fr: 'Bulbizarre', en: 'Bulbasaur' },
      sprites: { regular: 'bulba.png' }
    },
    {
      pokedex_id: 2,
      name: { fr: 'Herbizarre', en: 'Ivysaur' },
      sprite: { regular: 'ivy.png' }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService, 
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

    afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([PokemonService], (service: PokemonService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch and transform pokemon list from API', () => {
    service.getPokemonList();

    // Assert requête
    const req = httpMock.expectOne('https://tyradex.app/api/v1/gen/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

    // Vérifie le signal
    const expected: Pokemon[] = [
      { pokedex_id: 1, name: 'Bulbizarre', sprite: 'bulba.png' },
      { pokedex_id: 2, name: 'Herbizarre', sprite: 'ivy.png' }
    ];
    expect(service.pokemonList()).toEqual(expected);
  });

  it('should add pokemon if team has less than 6', () => {
    const poke: Pokemon = { pokedex_id: 999, name: 'Test', sprite: '' };
    const pikachu: Pokemon = { pokedex_id: 25, name: 'Pikachu', sprite: 'pika.png' };

    for (let i = 1; i <= 5; i++) {
      service.addPokemon({ ...poke, pokedex_id: i });
    }
    expect(service.pokemonPickedList().length).toBe(5);

    service.addPokemon(pikachu);
    expect(service.pokemonPickedList().length).toBe(6);
    expect(service.isPicked(25)).toBeTrue();
  });

  it('should NOT add pokemon if team is full (6)', () => {
    const poke: Pokemon = { pokedex_id: 999, name: 'Test', sprite: '' };
    const pikachu: Pokemon = { pokedex_id: 25, name: 'Pikachu', sprite: 'pika.png' };

    for (let i = 1; i <= 6; i++) {
      service.addPokemon({ ...poke, pokedex_id: i });
    }
    expect(service.pokemonPickedList().length).toBe(6);

    service.addPokemon(pikachu);
    expect(service.pokemonPickedList().length).toBe(6);
  });

  it('should remove pokemon by pokedex_id and verify if the remaining is picked', () => {
    const poke1 = { pokedex_id: 1, name: 'Test A', sprite: 'sprite.png' };
    const poke2 = { pokedex_id: 2, name: 'Test B', sprite: 'sprite.png' };
    service.addPokemon(poke1);
    service.addPokemon(poke2);

    service.removePokemon(1);
    expect(service.pokemonPickedList().length).toBe(1);
    expect(service.isPicked(1)).toBeFalse();
    expect(service.isPicked(2)).toBeTrue();
  });


});
