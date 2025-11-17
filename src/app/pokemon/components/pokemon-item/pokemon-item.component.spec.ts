/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonItemComponent } from './pokemon-item.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideToastr, ToastNoAnimation } from 'ngx-toastr';

describe('PokemonItemComponent', () => {
  let component: PokemonItemComponent;
  let fixture: ComponentFixture<PokemonItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ PokemonItemComponent ],
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
      ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
