import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CheckComponent } from './components/check/check.component';
import { ImputationComponent } from './components/imputation/imputation.component';
import { ImputationTableComponent } from './components/imputation-table/imputation-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'imputation', component: ImputationComponent },
  { path: 'check', component: CheckComponent },
  { path: '**', redirectTo: '/login' },
  // {
  //   path: 'imputation', component: ImputationComponent, children: [
  //     { path: '', component: ImputationTableComponent },
  //     { path: 'imputationTable', component: ImputationTableComponent }
  //   ]
  // },
  // { path: 'imputations', component: ImputationsComponent, canActivate: [LoginGuard] }, // Esta ruta tendrá guards
  // { path: 'check', component: CheckComponent, canActivate: [LoginGuard] }, // Esta ruta tendrá guards
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
