import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee.interface';
import { ImputationsService } from 'src/app/services/imputations.service';
import * as moment from 'moment'

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.css']
})
export class ImputationComponent implements OnInit {

  employee = JSON.parse(localStorage.getItem('employee')!); // el (!) evita el null
  imputationsWeek: any; // Carga las imputaciones de TODA LA SEMANA que corresponda
  arrImputationsWeek: any;
  currentWeek = moment().format('ww');
  week: any;

  constructor(
    private imputationsService: ImputationsService
  ) { }

  
  // Cuando carga el componente tengo que detectar en q semana estoy y currentWeek tendra que almacenar el valor de la semana.
  // Averiguamos cual es la semana actual para pasarselo a LoadImputations
  async ngOnInit() {
    try {
      this.imputationsWeek = await this.imputationsService.LoadImputations(this.currentWeek);
      // console.log('ngOnInit', this.imputationsWeek);
    } catch (error) {
      console.log(error);
    }
  }


  // Event del Output del componente calendar-Week para emitir la semana que seleccionemos.
  async getWeek($event: any) {
    // console.log('emitido', $event.week);

    this.week = $event.week;
    try {
      this.imputationsWeek = await this.imputationsService.LoadImputations($event.week);
    } catch (error) {
      console.log(error);
    }

  }


  async recharge($event: string) {
    if ($event === 'ok') {
      // console.log('this.week', this.week);
      try {
        if (this.week) {
          this.imputationsWeek = await this.imputationsService.LoadImputations(this.week);
        } else {
          this.imputationsWeek = await this.imputationsService.LoadImputations(this.currentWeek);
        }
      // console.log('recharge', this.imputationsWeek);
      } catch (error) {
        console.log(error);
      }

    }
  }

}
