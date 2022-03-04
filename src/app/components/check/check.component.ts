import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  currentProject: any;

  constructor(
    private projectsService: ProjectsService) {
    this.currentProject = {

      name: "javier",
      horas: 2,
      fecha: "04-03-2022"
    }
  }

  ngOnInit(): void {


  }

  // Evento del Output del componente Check-project para emitir los proyectos que seleccionemos
  //*Revisar

  async getProject($event: any) {
    console.log('emitido', $event.project);
    try {
      this.currentProject = await this.projectsService.showProject($event.project);
    } catch (error) {
      console.log(error);
    }


  }


}
