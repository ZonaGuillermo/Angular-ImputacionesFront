import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl: string = 'http://localhost:3000/api/'

  constructor(
    private httpClient: HttpClient
  ) { }



  //PEDIMOS los proyectos

  getByProject(pProject: any): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl + 'endpointdeProyectos', pProject));

  }

  //*Pendiente*****revisar showProject
  //RECIBIMOS las imputaciones de horas de TODA LA SEMANA actual o la que corresponda



  showProject(pProject: string): any[] {
    const project = [
      {
        "project":
        {
          "projectId": 111,
          "name": "Javier Plaza",
          "date": " 2022-03-04",
          "horas": 2

        },

      },

    ]

    return project;
  }

}
