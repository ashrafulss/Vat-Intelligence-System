// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DashboardComponent } from './dashboard.component';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [DashboardComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });




import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { LoadingImageComponent } from '../../../common/components/loading-image/loading-image.component';
import { DashboardService } from '../dashboard.service';

describe('DashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,  // Declare your DashboardComponent
        LoadingImageComponent // Declare the LoadingImageComponent if used in the component
      ],
      providers: [
        DashboardService,  // Provide the DashboardService if it's used by the component
        provideHttpClient(withFetch(), withInterceptorsFromDi())  // Provide HttpClient to the test environment
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();  // Check if the component is created successfully
  });
});

