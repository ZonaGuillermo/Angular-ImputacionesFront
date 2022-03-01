import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    }, [])
  }

  ngOnInit(): void {
  }

  async onLogin(pForm: any) {
    let response = await this.usersService.Login(pForm.value);
    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', response.user);
      this.router.navigate(['imputation']);
    } else {
      alert(response.error)
    }
  }


  checkControl(pcontrolName: string, errorName: string): boolean {
    if (this.loginForm.get(pcontrolName)?.hasError(errorName) && this.loginForm.get(pcontrolName)?.touched) {
      return true;
    } else {
      return false;
    }
  }
}
