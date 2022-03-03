import { Component, Input, OnInit } from '@angular/core';
import { ImputationsService } from 'src/app/services/imputations.service';


@Component({
  selector: 'app-imputation-table',
  templateUrl: './imputation-table.component.html',
  styleUrls: ['./imputation-table.component.css']
})
export class ImputationTableComponent implements OnInit {

  // Input de padre a hijo
  @Input() imputationsWeek: any;

  arrDays: string[] = ['lunes', 'martes', 'miercoles']

  constructor(
    private imputationsService: ImputationsService
  ) { }

  async ngOnInit(): Promise<void> {
    // try {
    //   this.imputationsWeek = await this.imputationsService.LoadImputations();
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // Enviamos las imputationces semanales al backend
  OnRegisterImputations(pForm: any) {
    // Recorremos el objeto que se forma en el formulario al guardar
    for (let key in pForm.value) {
      if (pForm.value[key] != "") {
        // Partimos la key para separar el id del proyecto del día de la semana
        // Estos datos vienen en el atributo name de los inputs del formulario
        let projectId = parseInt(key.split('-')[0]);
        let dayWeek = key.split('-')[1];
        this.imputationsService.SendImputation(projectId, dayWeek, pForm.value[key]);
      }
    }
  }


  

}
