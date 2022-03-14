import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginReviewerGuard implements CanActivate {
	constructor(
		private router: Router
	) {}

  canActivate(): boolean{
    const employee = JSON.parse(localStorage.getItem('employee')!);

		if (employee.reviewer.length !== 0) {
      return true;
		} else {
			this.router.navigate(['/imputation']);
			return false;
		}
	}
  
}
