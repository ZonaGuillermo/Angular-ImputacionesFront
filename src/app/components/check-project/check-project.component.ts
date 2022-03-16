import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-check-project',
  templateUrl: './check-project.component.html',
  styleUrls: ['./check-project.component.css']
})
export class CheckProjectComponent implements OnInit {

  //Creacion Output : hijo a padre (portal check)
  @Output() projectSelected: EventEmitter<any>;
  projectForm = this.fb.group({ project: "" })// formGroup
  projects = JSON.parse(localStorage.getItem('employee')!).reviewer;
  projectName: string = '';

  // Rellenamos el select con los valores de reviewer del localStorage
  constructor(private fb: FormBuilder) {
    this.projectForm.controls['project'].setValue(this.projects[0].project_Id);
    this.projectName = this.projects[0].projectName;
    this.projectSelected = new EventEmitter();
  }
  
  ngOnInit(): void { 
    
    this.projectSelected.emit(this.projects[0].project_Id);
    // console.log('projects', this.projects);

    // Subscripcion a los cambios del formulario de proyectos
    this.projectForm.controls['project'].valueChanges.subscribe((value) => {
      
      this.projectName = this.projects.find((project: any) => 
        project.project_Id == value
      ).projectName;

      // console.log('value', value);
      
      this.projectSelected.emit(value);

    });
  }


}
