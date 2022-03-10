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

  constructor(
    private imputationsService: ImputationsService,
  ) { }

  async ngOnInit() {
  }

  // Enviamos las imputationces semanales al backend
  OnRegisterImputations(pForm: any) {
    // Comprobamos que todos los días cumplen con el mínimo de horas diárias
    // según el calendario del empleado.
    // REHACER ESTA FUNCIÓN
    // this.MinimunDailyHours(pForm);

    this.imputationsService.SendImputation(this.imputationsWeek);
  }


  // REHACER ESTA FUNCIÓN
  MinimunDailyHours(pForm: any) {
    const arrWeekDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

    const employee = JSON.parse(localStorage.getItem('employee')!);
    const minimunDailyWorkHours = employee.calendar.daily_Hours;

    for (let weekDay of arrWeekDays) {
      let dailyWorkHours: number = 0;

      //Esta parte ya no sirve
      //=====================================================================
      // for (let key in pForm.value) {
      //   // Cortamos la key para comparar con el array de días
      //   let dayForm = key.split('-')[1]; 
      //   // Comparamos el día del formulario con el array de días
      //   // Si el input esta vacío se lo salta
      //     if (dayForm === weekDay
      //       && pForm.value[key] != undefined) {
      //       dailyWorkHours += parseInt(pForm.value[key]);
            
      //       if (dailyWorkHours >= this.minimunDailyWorkHours) {
      //         break;
      //       }
      //     }
      // }
      //=======================================================================

      // Si el número de horas diarias trabajadas es 0 o inferior al número mínimo 
      // de horas de la jornada laboral diaria salta el aviso de qué día se ha 
      // trabajado de menos. 
      if (dailyWorkHours !== 0 && dailyWorkHours < minimunDailyWorkHours) {
        alert(`El número de horas introducidas para el día ${weekDay} es inferior a la jornada laboral diaria`);
      }
    }
  }

  
}
