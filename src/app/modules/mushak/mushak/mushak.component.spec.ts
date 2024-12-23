import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MushakComponent } from './mushak.component';

describe('MushakComponent', () => {
  let component: MushakComponent;
  let fixture: ComponentFixture<MushakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MushakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MushakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
