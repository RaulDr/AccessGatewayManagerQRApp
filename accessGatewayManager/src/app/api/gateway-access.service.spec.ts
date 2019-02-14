import { inject, TestBed } from '@angular/core/testing';

import { GatewayAccessService } from './gateway-access.service';

describe('GatewayAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewayAccessService]
    });
  });

  it('should be created', inject([GatewayAccessService], (service: GatewayAccessService) => {
    expect(service).toBeTruthy();
  }));
});
