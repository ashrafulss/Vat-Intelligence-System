import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtaxpayerComponent } from './utaxpayer.component';

describe('UtaxpayerComponent', () => {
  let component: UtaxpayerComponent;
  let fixture: ComponentFixture<UtaxpayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtaxpayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtaxpayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
