// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CommissionerateComponent } from './commissionerate.component';

// describe('CommissionerateComponent', () => {
//   let component: CommissionerateComponent;
//   let fixture: ComponentFixture<CommissionerateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CommissionerateComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(CommissionerateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });






import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { CommissionerateComponent } from './commissionerate.component';
import { CommissionerateService } from '../services/commissionerate.service';


describe('CommissionerateComponent', () => {
  let component: CommissionerateComponent;
  let fixture: ComponentFixture<CommissionerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommissionerateComponent],
      providers: [
        provideHttpClient(withFetch(), withInterceptorsFromDi()), // Provide HttpClient for the service
        CommissionerateService, // Provide the service used in the component
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommissionerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases for the component's behavior
});
