import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = 'http://localhost:3000/api/'

  constructor(
    private httpClient: HttpClient
  ) { }


  Login(pFormValues: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'users/Login', pFormValues));
  }
}



