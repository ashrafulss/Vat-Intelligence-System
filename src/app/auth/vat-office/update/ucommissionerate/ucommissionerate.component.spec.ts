import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcommissionerateComponent } from './ucommissionerate.component';

describe('UcommissionerateComponent', () => {
  let component: UcommissionerateComponent;
  let fixture: ComponentFixture<UcommissionerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UcommissionerateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UcommissionerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
