import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImputationsService {

  baseUrl: string = 'http://localhost:3000/api/'

  constructor(
    private httpClient: HttpClient
  ) { }

  


  // ENVIAMOS al backend las horas imputadas por cada proyecto y día de la semana.
  // SOLO un proyecto y un día a la vez
  SendImputation(projectId: number, dayWeek: string, imputationHours: number) {

    const objImputation = {
      "projectId": projectId,
      "dayWeek": dayWeek,
      "imputationHours": imputationHours
    }

    lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'endpointImputaciones', objImputation));
  }


  //RECIBIMOS las imputaciones de horas de TODA LA SEMANA actual o la que corresponda
  // async LoadImputations(pWeek:string): Promise<any> {
  //   return await lastValueFrom(this.httpClient.get(this.baseUrl + 'endpointImputaciones'+ pWeek));
  // }

  
  //RECIBIMOS las imputaciones de horas de TODA LA SEMANA actual o la que corresponda
  LoadImputations(pWeek: string): any[] {
    const imputationsWeek = [
      {
        "project":
        {
          "projectId": 111,
          "projectName": "proyecto 11",
          "calendarId": 2
        },
        "imputations":
        {
          "monday": 5,
          "tuesday": 6,
          "wednesday": 2,
          "thursday": 3
        }
      },
      {
        "project":
        {
          "projectId": 222,
          "projectName": "proyecto 22"
        },
        "imputations":
        {
          "monday": 3,
          "tuesday": 4,
          "wednesday": 6,
          "thursday": 2,
          "friday": 1
        }
      },
      {
        "project":
        {
          "projectId": 333,
          "projectName": "proyecto 33"
        },
        "imputations":
        {
          "monday": 2,
          "tuesday": 5,
          "thursday": 1
        }
      },
    ]

    return imputationsWeek;
  }
}
