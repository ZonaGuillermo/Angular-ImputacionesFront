import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-imputation-table',
  templateUrl: './check-imputation-table.component.html',
  styleUrls: ['./check-imputation-table.component.css']
})
export class CheckImputationTableComponent implements OnInit {

  @Input() currentProject: any;

  constructor() { }

  ngOnInit(): void {
    console.log('Input currentProject', this.currentProject);
  }

}
