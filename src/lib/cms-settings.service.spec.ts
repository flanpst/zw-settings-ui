import { TestBed } from '@angular/core/testing';

import { CmsSettingsService } from './cms-settings.service';

describe('CmsSettingsService', () => {
  let service: CmsSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
