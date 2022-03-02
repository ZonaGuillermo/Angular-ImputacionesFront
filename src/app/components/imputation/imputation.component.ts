import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ImputationsService } from 'src/app/services/imputations.service';

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.css']
})
export class ImputationComponent implements OnInit {

  user: User | null;
  imputationsWeek: any;


  constructor(
    private imputationsService: ImputationsService

  ) {
    this.user = JSON.parse(localStorage.getItem('user')!); // el (!) evita el null
  }


  async ngOnInit(): Promise<void> {
    try {
      this.imputationsWeek = await this.imputationsService.LoadImputations(parseInt($event.week));
    } catch (error) {
      console.log(error);
    }
  }


  //event del Output de  componente calendar Week
  async getWeek($event: any) {

    console.log('emitido', $event.week);
    try {
      this.imputationsWeek = await this.imputationsService.LoadImputations(parseInt($event.week));
    } catch (error) {
      console.log(error);
    }

  }



}
