// import { TestBed } from '@angular/core/testing';

// import { CommissionerateService } from './commissionerate.service';

// describe('CommissionerateService', () => {
//   let service: CommissionerateService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CommissionerateService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });








import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { CommissionerateService } from './commissionerate.service';

describe('CommissionerateService', () => {
  let service: CommissionerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch(), withInterceptorsFromDi()), // Provide HttpClient
        CommissionerateService, // Provide the service under test
      ],
    });
    service = TestBed.inject(CommissionerateService); // Inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more test cases to verify the service's methods
});

