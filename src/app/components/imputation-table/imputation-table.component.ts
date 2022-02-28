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

}
