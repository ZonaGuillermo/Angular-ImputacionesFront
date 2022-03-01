import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.css']
})
export class ImputationComponent implements OnInit {

  user: User | null;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')!); // el (!) evita el null
  }


  ngOnInit(): void {
  }

}
