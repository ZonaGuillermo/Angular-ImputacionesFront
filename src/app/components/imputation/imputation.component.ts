import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ImputationsService } from 'src/app/services/imputations.service';
import * as moment from 'moment'

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.css']
})
export class ImputationComponent implements OnInit {

  user: User | null;
  imputationsWeek: any;
  currentWeek: string = "";


  constructor(
    private imputationsService: ImputationsService

  ) {
    // Cargamos los datos del usuario para pintarlos en pantalla.
    // Están guardados en el localStorage al cargar la página por el userService.
    // El userService se carga al hacer Login.
    this.user = JSON.parse(localStorage.getItem('user')!); // el (!) evita el null
  }


  async ngOnInit(): Promise<void> {
    // Cuando carga el componente tengo que detectar en q semana estoy y currentWeek tendra que almacenar el valor de la semana.
    // Averiguamos cual es la semana actual para pasarselo a LoadImputations
    this.currentWeek = moment().format('ww')// 


    try {
      // Carga las imputaciones de TODA LA SEMANA que corresponda
      this.imputationsWeek = await this.imputationsService.LoadImputations(this.currentWeek);
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
