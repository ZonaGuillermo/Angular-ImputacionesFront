import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.login = (localStorage.getItem('token') !== null)? true : false;
  }

  exitSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    this.router.navigate(['/login'])
  }

}
