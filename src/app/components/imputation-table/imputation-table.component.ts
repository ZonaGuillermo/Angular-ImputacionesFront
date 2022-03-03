import { Component, Input, OnInit } from '@angular/core';
import { ImputationsService } from 'src/app/services/imputations.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-imputation-table',
  templateUrl: './imputation-table.component.html',
  styleUrls: ['./imputation-table.component.css']
})
export class ImputationTableComponent implements OnInit {

  // Input de padre a hijo
  @Input() imputationsWeek: any;

  arrWeekDays: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  minimunDailyWorkHours: number = this.usersService.GetMinimunDailyHoursByUser();

  constructor(
    private imputationsService: ImputationsService,
    private usersService: UsersService
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
    // Comprobamos que todos los días cumplen con el mínimo de horas diárias
    // según el calendario del empleado.
    this.MinimunDailyHours(pForm);

    // Recorremos el objeto que se forma en el formulario al guardar
    for (let key in pForm.value) {
      if (pForm.value[key] != "") {
        // Partimos la key para separar el id del proyecto del día de la semana
        // Estos datos vienen en el atributo name de los inputs del formulario
        let projectId = parseInt(key.split('-')[0]);
        let dayForm = key.split('-')[1];
        this.imputationsService.SendImputation(projectId, dayForm, pForm.value[key]);
      }
    }
  }


  MinimunDailyHours(pForm: any) {
    for (let weekDay of this.arrWeekDays) {
      let dailyWorkHours: number = 0;

      for (let key in pForm.value) {
        // Cortamos la key para comparar con el array de días
        let dayForm = key.split('-')[1]; 
        // Comparamos el día del formulario con el array de días
        // Si el input esta vacío se lo salta
          if (dayForm === weekDay
            && pForm.value[key] != undefined) {
            dailyWorkHours += parseInt(pForm.value[key]);
            
            if (dailyWorkHours >= this.minimunDailyWorkHours) {
              break;
            }
          }
      }

      // Si el número de horas diarias trabajadas es 0 o inferior al número mínimo 
      // de horas de la jornada laboral diaria salta el aviso de qué día se ha 
      // trabajado de menos. 
      if (dailyWorkHours !== 0 && dailyWorkHours < this.minimunDailyWorkHours) {
        const spanishDay = this.SpanishDaysFunc(weekDay);

        alert(`El número de horas introducidas para el día ${spanishDay} es inferior a la jornada laboral diaria`);
      }
    }
  }


  // Función para escribir el día de la semana en español dentro del alert que avisa 
  // de si las horas imputadas son menos de las horas laborales diarias
  SpanishDaysFunc(pweekDay: string): string {
    const arrSpanishDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

    let spanishDay: string = "";

    switch (pweekDay) {
      case 'monday':
        spanishDay = arrSpanishDays[0];
        break;
    
      case 'tuesday':
        spanishDay = arrSpanishDays[1];
        break;
    
      case 'wednesday':
        spanishDay = arrSpanishDays[2];
        break;
    
      case 'thursday':
        spanishDay = arrSpanishDays[3];
        break;
    
      case 'friday':
        spanishDay = arrSpanishDays[4];
        break;
    
      case 'saturday':
        spanishDay = arrSpanishDays[5];
        break;
    
      case 'sunday':
        spanishDay = arrSpanishDays[6];
        break;
    }

    return spanishDay;
  }

}
