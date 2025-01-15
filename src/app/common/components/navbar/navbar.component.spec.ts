// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { NavbarComponent } from './navbar.component';

// describe('NavbarComponent', () => {
//   let component: NavbarComponent;
//   let fixture: ComponentFixture<NavbarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [NavbarComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(NavbarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });






import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { SessionService } from '../../services/session.service';

describe('NavbarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],  // Declare the component being tested
      providers: [
        SessionService,  // Provide the SessionService so that HttpClient is injected
        provideHttpClient(withFetch(), withInterceptorsFromDi()),  // Provide HttpClient with additional configuration
      ],
    }).compileComponents();
  });

  it('should createssss', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();  // Check that the component is created successfully
  });
});
