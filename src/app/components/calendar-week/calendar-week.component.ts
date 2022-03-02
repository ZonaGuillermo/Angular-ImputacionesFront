import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.css']
})
export class CalendarWeekComponent implements OnInit {
  dateNow: any;
  weekNow: any;
  weekForm = this.fb.group({ week: "" })
  weeks = Array(52);

  constructor(private fb: FormBuilder) {
    this.weekNow = moment().format('ww')
    this.weekForm.controls['week'].setValue(this.weekNow)
    this.dateNow = moment().format('DD-MM-YY')

  }


  ngOnInit(): void {
  }


  getWeek() {
    this.dateNow
    //Cuando el value sea igual a weeknow , que muestre weeknow 
  }
}
