import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required
      ]),

      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8)
      ]),
    }, [])
  }

  ngOnInit(): void {
  }

  onLogin(pForm: any) {
    this.employeesService.Login(pForm.value).subscribe((response) => {
      // console.log(response);
      if (response?.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('employee', JSON.stringify(response));
        this.router.navigate(['imputation']);
      } else {
        alert(response?.error)
      }
    });
  }


  checkControl(pcontrolName: string, errorName: string): boolean {
    if (this.loginForm.get(pcontrolName)?.hasError(errorName) && this.loginForm.get(pcontrolName)?.touched) {
      return true;
    } else {
      return false;
    }
  }
}
