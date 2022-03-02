import { Component, Input, OnInit } from '@angular/core';
import { ImputationsService } from 'src/app/services/imputations.service';


@Component({
  selector: 'app-imputation-table',
  templateUrl: './imputation-table.component.html',
  styleUrls: ['./imputation-table.component.css']
})
export class ImputationTableComponent implements OnInit {

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

    OnRegisterImputations(pForm: any) {
    for (let key in pForm.value) {
      if (pForm.value[key] != "") {
        let projectId = parseInt(key.split('-')[0]);
        let dayWeek = key.split('-')[1];
        this.imputationsService.SendImputation(projectId, dayWeek, pForm.value[key]);
      }
    }
  }

}
