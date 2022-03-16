import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { ImputationsService } from 'src/app/services/imputations.service';
import * as moment from 'moment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-imputation-table',
  templateUrl: './imputation-table.component.html',
  styleUrls: ['./imputation-table.component.css']
})
export class ImputationTableComponent implements OnInit {

  // Input de padre a hijo
  @Input() imputationsWeek: any;
  @Output() datosGuardados: EventEmitter<any>;
  arrWeekDays: string[];
  minimunDailyWorkHours: number;
  sumDailyWorker: any[];
  currentDate = moment().format('YYYY-MM-DD');


  constructor(
    private imputationsService: ImputationsService,
    private router: Router
  ) { 
    const employee = JSON.parse(localStorage.getItem('employee')!);
    this.minimunDailyWorkHours = employee.calendar.daily_Hours;
    this.arrWeekDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    this.sumDailyWorker = new Array(7);
    this.datosGuardados = new EventEmitter();
  }

  async ngOnInit() {
    // console.log(this.currentDate);
  }



  // Enviamos las imputationces semanales al backend
  // Comprobamos que todos los días cumplen con el mínimo de horas diárias
  // según el calendario del empleado.
  async OnRegisterImputations() {
		const result: any = this.MinimunDailyHours();
    this.sumDailyWorker = result.sumDailyWorker;
		
    if (result.passMinimunHours) {
      const response = await this.imputationsService.SendImputation(this.imputationsWeek);
      
      if (response) {
        this.datosGuardados.emit('ok');
      }
    }


  }


  MinimunDailyHours() {
    const sumDailyWorker: number[] = new Array(0, 0, 0, 0, 0, 0, 0);
		
		this.imputationsWeek.forEach((project: { imputations: any[]; }) => {
			project.imputations.forEach((imputation, index: number) => {
				if (imputation.hours != '') {
					sumDailyWorker[index] += imputation.hours;
				}
			});
		});

    // console.log('sumDailyWorker', sumDailyWorker);
    const passMinimunHours = !sumDailyWorker.some(elem => {
      return elem < this.minimunDailyWorkHours && elem !== 0;
    });

		return { passMinimunHours: passMinimunHours, sumDailyWorker: sumDailyWorker};
  }















  // REHACER ESTA FUNCIÓN
  // MinimunDailyHours(pForm: any) {
  //   // console.log('pForm.value', pForm.value);
  //   console.log('imputationsWeek', this.imputationsWeek);
  //   const arrWeekDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  //   const employee = JSON.parse(localStorage.getItem('employee')!);
  //   const minimunDailyWorkHours = employee.calendar.daily_Hours;

  //   for (let weekDay of arrWeekDays) {
  //     let dailyWorkHours: number = 0;

  //     //Esta parte ya no sirve
  //     //=====================================================================
  //     // for (let key in pForm.value) {
  //     //   // Cortamos la key para comparar con el array de días
  //     //   let dayForm = key.split('-')[1]; 
  //     //   // Comparamos el día del formulario con el array de días
  //     //   // Si el input esta vacío se lo salta
  //     //     if (dayForm === weekDay
  //     //       && pForm.value[key] != undefined) {
  //     //       dailyWorkHours += parseInt(pForm.value[key]);
            
  //     //       if (dailyWorkHours >= this.minimunDailyWorkHours) {
  //     //         break;
  //     //       }
  //     //     }
  //     // }
  //     //=======================================================================

  //     // Si el número de horas diarias trabajadas es 0 o inferior al número mínimo 
  //     // de horas de la jornada laboral diaria salta el aviso de qué día se ha 
  //     // trabajado de menos. 
  //     if (dailyWorkHours !== 0 && dailyWorkHours < minimunDailyWorkHours) {
  //       //alert(`El número de horas introducidas para el día ${weekDay} es inferior a la jornada laboral diaria`);
  //     }
  //   }
  // }

  
}
