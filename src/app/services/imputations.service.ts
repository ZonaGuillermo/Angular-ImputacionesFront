import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class ImputationsService {

  baseUrl: string = 'https://localhost:7091/api/'

  constructor(
    private httpClient: HttpClient
  ) { }

  
  SendImputation(imputationsWeek: any[]) {
    const employee = JSON.parse(localStorage.getItem('employee')!);

    let result = new Array();
    result = JSON.parse(JSON.stringify(imputationsWeek));

    result.forEach(project => {
      project.employeeId = employee.employee_Id;

      project.imputations = project.imputations.filter((imputation: { hours: string; }) => {
        return imputation.hours !== '' && imputation.hours !== null;
      });

      project.imputations.map((imputation: { state: number; imputation_Id: number }) => {
        if (!imputation.imputation_Id) {
          imputation.imputation_Id = 0;
        }

        // Si es estado es nulo o 'rechazado' se cambia a 'enviado'
        if (imputation.state === null || imputation.state === 3) {
          imputation.state = 1;
        }
      });
    });

    console.log('result', result);

      return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'Imputation/ImputationPost', result));
  }


  //RECIBIMOS las imputaciones de horas de TODA LA SEMANA actual o la que corresponda
  async LoadImputations(pWeek: string): Promise<any> {
    const employee = JSON.parse(localStorage.getItem('employee')!);
		const weekAndEmployeeId = { "week": pWeek, "employee_Id": employee.employee_Id };

    const imputationsWeek = await lastValueFrom(this.httpClient.post(this.baseUrl + 'Imputation/GetImputationsByEmployeeByWeek', weekAndEmployeeId));

    // console.log(imputationsWeek);
    // Convierto el objeto que devuelve el back en un array para usar el map()
    const arrImputationsWeek = Object.values(imputationsWeek);
    
    if (arrImputationsWeek.length == 0) {
      return { "message": "No hay proyectos en esta semana" };
    }

    return arrImputationsWeek.map((project: any) => {

      const imputationsTemp: any[] = new Array(7);
      
      for (let i = 0; i < 7; i++) {
        const date = moment().day("Monday").week(parseInt(pWeek)).add(i, 'day').format('YYYY-MM-DD');
        const imputationExistente = project.imputations
          .find((imputation: any) => {
            return (i + 1) === imputation.day
          })

        if (imputationExistente) {
          imputationExistente.week = parseInt(pWeek);
          imputationExistente.date = date;
          imputationsTemp[i] = imputationExistente;
        } else {
          imputationsTemp[i] = {
            "day": i + 1,
            "hours": '',
            "date": date,
            "state": null,
            "extra_Hours": 0,
            "week": parseInt(pWeek),
            "message": null,
            "status": null
          }
        }

      }
      project.imputations = imputationsTemp;
      return project;
    });

  }
}
