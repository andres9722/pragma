import { TestBed, inject } from '@angular/core/testing';

import { PolidocsService } from './polidocs.service';

describe('PolidocsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolidocsService]
    });
  });

  it('should be created', inject([PolidocsService], (service: PolidocsService) => {
    expect(service).toBeTruthy();
  }));
});
