import { Component, OnInit } from '@angular/core';
import { StatusImputation } from 'src/app/enums/statusImputation.enum';
import { ChecksService } from 'src/app/services/checks.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  currentProjectFather: any;
  currentProjectId: any;

  constructor(
    private checksService: ChecksService
  ) {
  }

  ngOnInit(): void {


  }

  // Evento del Output del componente Check-project para emitir los proyectos que seleccionemos
  //*Revisar

  getProjectSelected($event: any) {
    // console.log('emitido', $event);
    this.currentProjectId = $event;
    // Aquí la consulta al servicio para recoger las imputaciones por proyecto
    // this.currentProject = "Aquí va el objeto id=" + $event;
    // console.log('Estoy en getProjectSelected');
    // console.log('currentProjectId', this.currentProjectId);
    this.checksService.LoadReviewByProjectId($event)
      .subscribe((response) => {
        // console.log('response', response);
        this.currentProjectFather = response;
        // this.imputationProject.controls['employeeName'].setValue(response.body.data[0].employeeName)
    })
    

  }

  OnStatusChanged(imputationNewStatus: {id: number, newStatus: StatusImputation}) {
    this.checksService.SendOneReview({ id: imputationNewStatus.id, status: imputationNewStatus.newStatus }).subscribe((response) => {
      this.getProjectSelected(this.currentProjectId);
    })
  }

  OnApproveAll() {
    this.checksService.SendAllReview(this.currentProjectId).subscribe(() => {
      // console.log('Estoy aquí');
      this.getProjectSelected(this.currentProjectId);
    })
  }
}
