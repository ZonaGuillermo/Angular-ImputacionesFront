import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ImputationComponent } from './components/imputation/imputation.component';
import { ImputationTableComponent } from './components/imputation-table/imputation-table.component';
import { CalendarWeekComponent } from './components/calendar-week/calendar-week.component';
import { CheckComponent } from './components/check/check.component';
=======
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
>>>>>>> 2c9773085134bc40d5c5b9df45c09fd69fb361a9

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HeaderComponent,
    LoginComponent,
    ImputationComponent,
    ImputationTableComponent,
    CalendarWeekComponent,
    CheckComponent
=======
    LoginComponent,
    HomeComponent
>>>>>>> 2c9773085134bc40d5c5b9df45c09fd69fb361a9
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    ReactiveFormsModule
=======
    ReactiveFormsModule,
    HttpClientModule
>>>>>>> 2c9773085134bc40d5c5b9df45c09fd69fb361a9
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
