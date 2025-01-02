import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './common/services/auth.guard';
import { HomeResolver } from './components/home/home.resolver';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: { home: HomeResolver },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { animation: 'DashboardPage' },
      },
    //   {
    //     path: '', redirectTo: 'dashboard', pathMatch: 'full',
    // },
      {
        path: 'analysis',
        loadChildren: () => import('./modules/analysis/analysis.module').then(m => m.AnalysisModule),
        data: { animation: 'AnalysisPage' },
      },
      {
        path: 'monitoring',
        loadChildren: () => import('./modules/monitoring/monitoring.module').then(m => m.MonitoringModule),
        data: { animation: 'MonitoringPage' },
      },
      {
        path: 'vat-office',
        loadChildren: () => import('./modules/vat-office/vat-office.module').then(m => m.VatOfficeModule),
        data: { animation: 'VatOfficePage' },
      },
      {
        path: 'mushaks',
        loadChildren: () => import('./modules/mushak/mushak.module').then(m => m.MushakModule),
        data: { animation: 'MushakPage' },
      }
    ]
  },
  
  // {
  //   path: 'login',
  //   children: [
  //     { path: '', component: LoginComponent }
  //   ]
  // },
  
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
