import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
>>>>>>> 2c9773085134bc40d5c5b9df45c09fd69fb361a9

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
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
>>>>>>> 2c9773085134bc40d5c5b9df45c09fd69fb361a9

  ngOnInit(): void {
  }

<<<<<<< HEAD
=======
  async onLogin(pForm: any) {
    let response = await this.usersService.Login(pForm.value);
    if (response.token) {
      localStorage.setItem('token', response.token)
      this.router.navigate(['home']);
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
>>>>>>> 2c9773085134bc40d5c5b9df45c09fd69fb361a9
}
