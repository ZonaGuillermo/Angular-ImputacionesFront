import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-check-project',
  templateUrl: './check-project.component.html',
  styleUrls: ['./check-project.component.css']
})
export class CheckProjectComponent implements OnInit {

  //Creacion Output : hijo a padre ( portal check)
  @Output() selectProject: EventEmitter<any>

  projectForm = this.fb.group({ project: "" })// formGroup
  projects = Array(15); // Numero de proyectos

  constructor(private fb: FormBuilder) {
    this.projectForm.controls['project'].setValue(this.projects)//*pendiente llenar setValue

    this.selectProject = new EventEmitter();
  }

  ngOnInit(): void {

    // Subscripcion a los cambios del formulario de proyectos

    this.projectForm.valueChanges.subscribe((value) => {
      //console.log('cambios', value);
      this.selectProject.emit(value)
    })

  }

}
