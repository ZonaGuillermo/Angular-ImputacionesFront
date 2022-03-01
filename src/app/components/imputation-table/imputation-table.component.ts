import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-imputation-table',
  templateUrl: './imputation-table.component.html',
  styleUrls: ['./imputation-table.component.css']
})
export class ImputationTableComponent implements OnInit {

  registerImputations: FormGroup;

  constructor() { 
    this.registerImputations = new FormGroup({});
  }

  ngOnInit(): void {
  }

    OnRegisterImputations(pForm: any) {
    for (let key in pForm.value) {
      if (pForm.value[key] != "") {
        let idProyecto = parseInt(key.split('-')[0]);
        let diaSemana = key.split('-')[1];
        console.log(idProyecto, diaSemana, pForm.value[key]);
      }
    }
  }

}
