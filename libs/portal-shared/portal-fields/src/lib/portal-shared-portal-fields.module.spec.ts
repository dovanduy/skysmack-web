import { async, TestBed } from '@angular/core/testing';
import { PortalSharedPortalFieldsModule } from './portal-shared-portal-fields.module';

describe('PortalSharedPortalFieldsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PortalSharedPortalFieldsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PortalSharedPortalFieldsModule).toBeDefined();
  });
});
