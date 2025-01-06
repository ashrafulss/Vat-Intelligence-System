import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionerateComponent } from './commissionerate.component';

describe('CommissionerateComponent', () => {
  let component: CommissionerateComponent;
  let fixture: ComponentFixture<CommissionerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommissionerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommissionerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
