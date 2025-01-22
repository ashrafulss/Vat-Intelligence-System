import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseComparisonComponent } from './purchase-comparison.component';

describe('PurchaseComparisonComponent', () => {
  let component: PurchaseComparisonComponent;
  let fixture: ComponentFixture<PurchaseComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
