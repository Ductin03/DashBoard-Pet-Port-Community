import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDetailRequestUpgradeComponent } from './get-detail-request-upgrade.component';

describe('GetDetailRequestUpgradeComponent', () => {
  let component: GetDetailRequestUpgradeComponent;
  let fixture: ComponentFixture<GetDetailRequestUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetDetailRequestUpgradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDetailRequestUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
