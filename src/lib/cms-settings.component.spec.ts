import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSettingsComponent } from './cms-settings.component';

describe('CmsSettingsComponent', () => {
  let component: CmsSettingsComponent;
  let fixture: ComponentFixture<CmsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
