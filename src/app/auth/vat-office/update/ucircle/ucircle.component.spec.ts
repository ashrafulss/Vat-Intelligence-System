import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcircleComponent } from './ucircle.component';

describe('UcircleComponent', () => {
  let component: UcircleComponent;
  let fixture: ComponentFixture<UcircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UcircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
