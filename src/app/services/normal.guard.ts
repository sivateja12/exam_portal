import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class NormalGuard implements CanActivate {
  constructor(private login: LoginService,private router:Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.login.isLoggedin() && this.login.getUserRole() === 'NORMAL') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
