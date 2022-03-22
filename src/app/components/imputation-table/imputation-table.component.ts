import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { ImputationsService } from 'src/app/services/imputations.service';
import * as moment from 'moment'

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
  currentWeek = moment().format('ww');


  constructor(
    private imputationsService: ImputationsService,
  ) { 
    const employee = JSON.parse(localStorage.getItem('employee')!);
    this.minimunDailyWorkHours = employee.calendar.daily_Hours;
    this.arrWeekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
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


}
