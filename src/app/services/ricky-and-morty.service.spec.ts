import { TestBed } from '@angular/core/testing';

import { RickyAndMortyService } from './ricky-and-morty.service';

describe('RickyAndMortyService', () => {
  let service: RickyAndMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickyAndMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
