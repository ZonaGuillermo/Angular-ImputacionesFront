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
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'users/Login/', pFormValues));
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



