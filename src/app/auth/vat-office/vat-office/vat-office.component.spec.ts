import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatOfficeComponent } from './vat-office.component';

describe('VatOfficeComponent', () => {
  let component: VatOfficeComponent;
  let fixture: ComponentFixture<VatOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VatOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VatOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
