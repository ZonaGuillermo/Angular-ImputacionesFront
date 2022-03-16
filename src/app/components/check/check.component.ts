import { Component, OnInit } from '@angular/core';
import { ChecksService } from 'src/app/services/checks.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  currentProject: any;

  constructor(
    private checksService: ChecksService
  ) {
  }

  ngOnInit(): void {


  }

  // Evento del Output del componente Check-project para emitir los proyectos que seleccionemos
  //*Revisar

  async getProjectSelected($event: any) {
    // console.log('emitido', $event);

    // Aquí la consulta al servicio para recoger las imputaciones por proyecto
    // this.currentProject = "Aquí va el objeto id=" + $event;
    this.currentProject = await this.checksService.LoadReviewByProjectId($event);

    console.log('currentProject', this.currentProject);

  }


}
