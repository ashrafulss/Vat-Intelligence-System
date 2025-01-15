import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



import { HomeComponent } from './auth/home/home.component';
import { HomeResolver } from './auth/home/home.resolver';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';




const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: { home: HomeResolver },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./auth/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full',
      },
      {
        path: 'analysis',
        loadChildren: () => import('./auth/analysis/analysis.module').then(m => m.AnalysisModule)
      },
      {
        path: 'monitoring',
        loadChildren: () => import('./auth/monitoring/monitoring.module').then(m => m.MonitoringModule)
      },
      {
        path: 'vat-office',
        loadChildren: () => import('./auth/vat-office/vat-office.module').then(m => m.VatOfficeModule)
      },
      {
        path: 'mushaks',
        loadChildren: () => import('./auth/mushak/mushak.module').then(m => m.MushakModule)
      }
    ]
  },

  {
    path: 'login',
    children: [
      { path: '', component: LoginComponent }
    ]
  },

  {
    path: 'session-expired',
    loadChildren: () => import('./security/session-expired/session-expired.module').then(mod => mod.SessionExpiredModule)
  },

  {
    path: 'page-not-found',
    loadChildren: () => import('./security/page-not-found/page-not-found.module').then(mod => mod.PageNotFoundModule)
  },

  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


