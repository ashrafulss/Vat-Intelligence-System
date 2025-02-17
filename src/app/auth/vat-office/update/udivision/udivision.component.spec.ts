import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdivisionComponent } from './udivision.component';

describe('UdivisionComponent', () => {
  let component: UdivisionComponent;
  let fixture: ComponentFixture<UdivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UdivisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
