import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { LoginReviewerGuard } from './guards/login-reviewer.guard';
import { ImputationComponent } from './components/imputation/imputation.component';
import { CheckComponent } from './components/check/check.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'imputation', component: ImputationComponent, canActivate: [LoginGuard] },
  { path: 'check', component: CheckComponent, canActivate: [LoginGuard, LoginReviewerGuard] },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
