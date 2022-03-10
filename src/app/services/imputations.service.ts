import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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
        return imputation.hours !== '';
      });

      project.imputations.map((imputation: { state: string; }) => {
        if (imputation.state === '') {
          imputation.state = 'sent';
        }
      });
    });

    console.log('result', result);

    //   lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'endpointImputaciones', result));
  }


  //RECIBIMOS las imputaciones de horas de TODA LA SEMANA actual o la que corresponda
  async LoadImputations(pWeek: string): Promise<any> {
    const employee = JSON.parse(localStorage.getItem('employee')!);
		const weekAndEmployeeId = { "week": pWeek, "employee_Id": employee.employee_Id };
    // const weekAndEmployeeId = { "week": pWeek, "employee_Id": 2 };
		// console.log(weekAndEmployeeId);
    const imputationsWeek = await lastValueFrom(this.httpClient.post(this.baseUrl + 'Imputation/GetImputationsByEmployeeByWeek', weekAndEmployeeId));

    // Convierto el objeto que devuelve el back en un array para usar el map()
    const arrImputationsWeek = Object.values(imputationsWeek);
    
    if (arrImputationsWeek.length == 0) {
      return { "message": "No hay proyectos en esta semana" };
    }

    return arrImputationsWeek.map((project: any) => {

      const imputationsTemp: any[] = new Array(7);
      
      for (let i = 0; i < 7; i++) {
        const imputationExistente = project.imputations
          .find((imputation: any) => {
            return (i + 1) === imputation.day
          })

        if (imputationExistente) {
          imputationExistente.week = parseInt(pWeek);
          imputationsTemp[i] = imputationExistente;
        } else {
          imputationsTemp[i] = {
            "day": i + 1,
            "hours": "",
            "state": "",
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


  
  //RECIBIMOS las imputaciones de horas de TODA LA SEMANA actual o la que corresponda
//   LoadImputations(pWeek: string): any[] {
//     const imputationsWeek = [
//       {
//         "projectName": "Proyecto 1",
//         "projectId": 1,
//         "imputations": [
//           {
//             "imputation_Id": 26,
//             "day": 1,
//             "hours": 3,
//             "state": "sent",
//             "extra_Hours": 0,
//             "week": 3,
//             "message": null,
//             "status": null
//           },
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
//       {
//         "projectName": "Proyecto 2",
//         "projectId": 2,
//         "imputations": [
//           {
//             "imputation_Id": 3,
//             "day": 1,
//             "hours": 4,
//             "state": "sent",
//             "extra_Hours": 0,
//             "week": 3,
//             "message": null,
//             "status": null
//           },
//           {
//             "imputation_Id": 24,
//             "day": 4,
//             "hours": 5,
//             "state": "sent",
//             "extra_Hours": 0,
//             "week": 3,
//             "message": null,
//             "status": null
//           }
//         ]
//       },
//       {
//         "projectName": "Proyecto 3",
//         "projectId": 3,
//         "imputations": [
//           {
//             "imputation_Id": 23,
//             "day": 3,
//             "hours": 3,
//             "state": "sent",
//             "extra_Hours": 0,
//             "week": 3,
//             "message": null,
//             "status": null
//           },
//           {
//             "imputation_Id": 25,
//             "day": 5,
//             "hours": 4,
//             "state": "sent",
//             "extra_Hours": 0,
//             "week": 3,
//             "message": null,
//             "status": null
//           }
//         ]
//       },
//       {
//         "projectName": "Proyecto 4",
//         "projectId": 4,
//         "imputations": []
//       }    
//     ]

//     return imputationsWeek.map((project)=>{

//       const imputationsTemp: any[] = new Array(7);
      
//       for(let i = 0; i < 7; i++){
//         const imputationExistente = project.imputations
//         .find((imputation)=>{
//             return (i+1) === imputation.day
//           })

//         if (imputationExistente) {
//           imputationExistente.week = parseInt(pWeek);
//             imputationsTemp[i] = imputationExistente;
//           }else{
//             imputationsTemp[i] = {
//                 "day": i+1,
//                 "hours": "",
//                 "state": "",
//                 "extra_Hours": 0,
//                 "week": parseInt(pWeek),
//                 "message": null,
//                 "status": null
//             }
//           }

//       }
//       project.imputations = imputationsTemp;
//       return project;
//     });
//   }
// }