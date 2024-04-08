import { TestBed } from '@angular/core/testing';

import { ChefDepartementService } from './chef-departement.service';

describe('ChefDepartementService', () => {
  let service: ChefDepartementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChefDepartementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
