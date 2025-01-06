import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpandComponent } from './all-expand.component';

describe('AllExpandComponent', () => {
  let component: AllExpandComponent;
  let fixture: ComponentFixture<AllExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllExpandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
