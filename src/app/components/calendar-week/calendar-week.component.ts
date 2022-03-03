import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.css']
})
export class CalendarWeekComponent implements OnInit {

  //creacion output: hijo a padre
  @Output() selectWeek: EventEmitter<any>

  dateNow: any; // Para mostrar la fecha actual
  weekNow: any; // Recoge la semana actual
  weekForm = this.fb.group({ week: "" })// formGroup
  weeks = Array(52); // Número de semanas al año

  constructor(private fb: FormBuilder) {
    this.dateNow = moment().format('DD-MM-YY') // fecha actual
    this.weekNow = moment().format('ww')// semana actual
    this.weekForm.controls['week'].setValue(this.weekNow)

    this.selectWeek = new EventEmitter();
  }
  
  
  ngOnInit(): void {
    //Subscripcion a los carmbios del formulario de semanas
    this.weekForm.valueChanges.subscribe((value) => {
      //console.log('cambios:', value)
      // Emitimos el output al componente padre (imputations.component)
      this.selectWeek.emit(value);
    })
  }

}
