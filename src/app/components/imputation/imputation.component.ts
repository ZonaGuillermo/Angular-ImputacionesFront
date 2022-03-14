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

  employee: Employee | null;
  imputationsWeek: any; // Carga las imputaciones de TODA LA SEMANA que corresponda

  constructor(
    private imputationsService: ImputationsService

  ) {
    // Cargamos los datos del usuario para pintarlos en pantalla.
    // Están guardados en el localStorage al cargar la página por el userService.
    // El userService se carga al hacer Login.
    this.employee = JSON.parse(localStorage.getItem('employee')!); // el (!) evita el null
  }

  
  // Cuando carga el componente tengo que detectar en q semana estoy y currentWeek tendra que almacenar el valor de la semana.
  // Averiguamos cual es la semana actual para pasarselo a LoadImputations
  async ngOnInit(): Promise<void> {
    const currentWeek = moment().format('ww');

    try {
      this.imputationsWeek = await this.imputationsService.LoadImputations(currentWeek);
    } catch (error) {
      console.log(error);
    }
  }


  // Event del Output del componente calendar-Week para emitir la semana que seleccionemos.
  async getWeek($event: any) {

    // console.log('emitido', $event.week);
    try {
      this.imputationsWeek = await this.imputationsService.LoadImputations($event.week);
    } catch (error) {
      console.log(error);
    }

  }



}
