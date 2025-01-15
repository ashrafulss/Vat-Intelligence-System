// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { VatOfficeComponent } from './vat-office.component';

// describe('VatOfficeComponent', () => {
//   let component: VatOfficeComponent;
//   let fixture: ComponentFixture<VatOfficeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [VatOfficeComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(VatOfficeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { VatOfficeComponent } from './vat-office.component';

describe('VatOfficeComponent', () => {
  let component: VatOfficeComponent;
  let fixture: ComponentFixture<VatOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]), // Manually configure the router with an empty route configuration
      ],
      providers: [
        provideHttpClient(withFetch(), withInterceptorsFromDi()), // Add HttpClient provider
      ],
      declarations: [VatOfficeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VatOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
