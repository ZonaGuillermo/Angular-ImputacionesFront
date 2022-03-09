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
      "dayWeek": dayWeek, //day: number
      "imputationHours": imputationHours //hours
      //"extra_hours": null
      //"Employee_id": sacalo del localStorage "user"
      //"week": sácalo del componente week(input)
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
        "projectName": "Proyecto 1",
        "projectId": 1,
        "imputations": [
          {
            "imputation_Id": 26,
            "day": 1,
            "hours": 3,
            "state": "sent",
            "extra_Hours": 0,
            "week": 3,
            "message": null,
            "status": null
          },
          {
            "imputation_Id": 4,
            "day": 2,
            "hours": 3,
            "state": "sent",
            "extra_Hours": 0,
            "week": 3,
            "message": null,
            "status": null
          }
        ]
      },
      {
        "projectName": "Proyecto 2",
        "projectId": 2,
        "imputations": [
          {
            "imputation_Id": 3,
            "day": 1,
            "hours": 4,
            "state": "sent",
            "extra_Hours": 0,
            "week": 3,
            "message": null,
            "status": null
          },
          {
            "imputation_Id": 24,
            "day": 4,
            "hours": 5,
            "state": "sent",
            "extra_Hours": 0,
            "week": 3,
            "message": null,
            "status": null
          }
        ]
      },
      {
        "projectName": "Proyecto 3",
        "projectId": 3,
        "imputations": [
          {
            "imputation_Id": 23,
            "day": 3,
            "hours": 3,
            "state": "sent",
            "extra_Hours": 0,
            "week": 3,
            "message": null,
            "status": null
          },
          {
            "imputation_Id": 25,
            "day": 5,
            "hours": 4,
            "state": "sent",
            "extra_Hours": 0,
            "week": 3,
            "message": null,
            "status": null
          }
        ]
      }
    ]

    return imputationsWeek.map((project)=>{

      const imputationsTemp:any[] = new Array(7);
      for(let i = 0; i < 7; i++){
        const imputationExistente = project.imputations
        .find((imputation)=>{
            return (i+1) === imputation.day
          })

          if(imputationExistente){
            imputationsTemp[i] = imputationExistente;
          }else{
            imputationsTemp[i] = {
                "day": i+1,
                "hours": "",
                "state": "",
                "extra_Hours": 0,
                "week": pWeek,
                "message": null,
                "status": null
            }
          }

      }
      project.imputations = imputationsTemp;
      return project;
      // project.imputations = project.imputations.map((imputation)=>{

      //   return imputation;
      // })
    });
  }
}
//  {
//         "projectName": "Proyecto 1",
//         "projectId": 1,
//         "imputations": [
          // {
          //   "imputation_Id": 26,
          //   "day": 1,
          //   "hours": 3,
          //   "state": "sent",
          //   "extra_Hours": 0,
          //   "week": 3,
          //   "message": null,
          //   "status": null
          // },
//           {
//             "imputation_Id": 4,
//             "day": 2,
//             "hours": 3,
//             "state": "sent",
//             "extra_Hours": 0,
//             "week": 3,
//             "message": null,
//             "status": null
//           }
//         ]
//       },