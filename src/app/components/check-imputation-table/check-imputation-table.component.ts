import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StatusImputation } from 'src/app/enums/statusImputation.enum';
import { ChecksService } from 'src/app/services/checks.service';

@Component({
  selector: 'app-check-imputation-table',
  templateUrl: './check-imputation-table.component.html',
  styleUrls: ['./check-imputation-table.component.css']
})
export class CheckImputationTableComponent implements OnInit {

  @Input() currentProject: any;
  @Output() statusChange = new EventEmitter<{ id: number, newStatus: StatusImputation }>();
  @Output() approveAll = new EventEmitter<void>();
  statusImputation = StatusImputation;

  constructor(
    private checksService: ChecksService
  ) { }

  ngOnInit(): void {
    // console.log('Input currentProject', this.currentProject);
  }

  changeStatus(newStatus: StatusImputation, imputationProject: any): void {
    this.statusChange.emit({ id: imputationProject.imputationId, newStatus });
  }


}
