import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl: string = 'https://localhost:7091/api/'

  constructor(
    private httpClient: HttpClient
  ) { }


  Login(pFormValues: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'Employee/Login/', pFormValues);
  }


}



