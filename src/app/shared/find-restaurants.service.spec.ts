import { TestBed } from '@angular/core/testing';

import { FindRestaurantsService } from './find-restaurants.service';

describe('FindRestaurantsService', () => {
  let service: FindRestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindRestaurantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
