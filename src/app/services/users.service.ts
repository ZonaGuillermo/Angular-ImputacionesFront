import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = 'https://localhost:7091/api/'

  constructor(
    private httpClient: HttpClient
  ) { }


  Login(pFormValues: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + 'Employee/Login/', pFormValues);
  }

  // PEDIMOS el número de horas díarias mínimas de jornada laboral
  GetMinimunDailyHoursByUser() {
    // Primero obtenemos el calendario que usa el empleado de la cadena/objeto 
    // guardada en el localStorage 'user';
    const user = JSON.parse(localStorage.getItem('user')!);
    // console.log('user.calendarId: ', user.calendarId);

    // Segundo, realizamos la consulta al back para obtener 
    // el número de horas díarias mínimas de jornada laboral
    // return lastValueFrom(this.httpClient.get<any>(this.baseUrl + 'endpointAlCalendario/' + user.calendarId));
    
    return 9;
  }


}



