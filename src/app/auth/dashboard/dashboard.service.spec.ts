// import { TestBed } from '@angular/core/testing';

// import { DashboardService } from './dashboard.service';

// describe('DashboardService', () => {
//   let service: DashboardService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(DashboardService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';  // Adjust the path to your service

import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingImageComponent } from '../../common/components/loading-image/loading-image.component';

describe('DashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,   // Declare your DashboardComponent
        LoadingImageComponent // Declare the LoadingImageComponent
      ],
      providers: [
        DashboardService,  // Provide the DashboardService
        provideHttpClient(withFetch(), withInterceptorsFromDi()),  // Provide HttpClient to the test
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();  // Check if the component is successfully created
  });
});



















// ----------------------------

// {
//   "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
//   "version": 1,
//   "newProjectRoot": "projects",
//   "projects": {
//     "bas-app": {
//       "projectType": "application",
//       "schematics": {
//         "@schematics/angular:component": {
//           "standalone": false
//         },
//         "@schematics/angular:directive": {
//           "standalone": false
//         },
//         "@schematics/angular:pipe": {
//           "standalone": false
//         }
//       },
//       "root": "",
//       "sourceRoot": "src",
//       "prefix": "app",
//       "architect": {
//         "build": {
//           "builder": "@angular-devkit/build-angular:application",
//           "options": {
//             "outputPath": "dist/bas-app",
//             "index": "src/index.html",
//             "browser": "src/main.ts",
//             "polyfills": [
//               "zone.js"
//             ],
//             "tsConfig": "tsconfig.app.json",
//             "assets": [
//               {
//                 "glob": "**/*",
//                 "input": "public"
//               },
//               {
//                 "glob": "**/*",
//                 "input": "src/assets",
//                 "output": "assets"
//               }
//             ],
//             "styles": [
//               "src/styles.css",
//               "node_modules/bootstrap/dist/css/bootstrap.min.css",
//               "node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
//               "node_modules/bootstrap-icons/font/bootstrap-icons.css"
//             ],
//             "scripts": [
//               "node_modules/@popperjs/core/dist/umd/popper.min.js",
//               "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
//             ],
//             "server": "src/main.server.ts",
//             "prerender": true,
//             "ssr": {
//               "entry": "server.ts"
//             }
//           },
//           "configurations": {
//             "production": {
//               "fileReplacements": [
//                 {
//                   "replace": "src/environments/environment.ts",
//                   "with": "src/environments/environment.prod.ts"
//                 }
//               ],
             
             
//               "budgets": [
//                 {
//                   "type": "initial",
//                   "maximumWarning": "500kB",
//                   "maximumError": "1MB"
//                 },
//                 {
//                   "type": "anyComponentStyle",
//                   "maximumWarning": "2kB",
//                   "maximumError": "4kB"
//                 }
//               ],
//               "outputHashing": "all",
//               "optimization": true
//             },
//             "development": {
//               "optimization": false,
//               "extractLicenses": false,
//               "sourceMap": true
//             }
//           },
//           "defaultConfiguration": "production"
//         },
//         "serve": {
//           "builder": "@angular-devkit/build-angular:dev-server",
//           "options": {
//             "port": 4200, 
//             "open": true
//           },
//           "configurations": {
//             "production": {
//               "buildTarget": "bas-app:build:production"
//             },
//             "development": {
//               "buildTarget": "bas-app:build:development"
//             }
//           },
//           "defaultConfiguration": "development"
//         },
//         "extract-i18n": {
//           "builder": "@angular-devkit/build-angular:extract-i18n"
//         },
//         "test": {
//           "builder": "@angular-devkit/build-angular:karma",
//           "options": {
//             "polyfills": [
//               "zone.js",
//               "zone.js/testing"
//             ],
//             "tsConfig": "tsconfig.spec.json",
//             "assets": [
//               {
//                 "glob": "**/*",
//                 "input": "public"
//               }
//             ],
//             "styles": [
//               "src/styles.css"
//             ],
//             "scripts": []
//           }
//         }
//       }
//     }
//   },
//   "cli": {
//     "analytics": "feb4fb40-366f-4295-94b7-2da49c693a50"
//   }
// }











