import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPetOwnerComponent } from './detail-pet-owner.component';

describe('DetailPetOwnerComponent', () => {
  let component: DetailPetOwnerComponent;
  let fixture: ComponentFixture<DetailPetOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPetOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
