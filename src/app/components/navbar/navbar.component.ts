import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user: any = { username: null }; // Provide a default value

constructor(public login:LoginService,public router:Router){}


ngOnInit(): void {
  this.isLoggedIn = this.login.isLoggedin();
  this.user = this.login.getUser()  // Initialize or provide a default value
  this.login.loginStatusSubject.asObservable().subscribe(data=>{
    this.isLoggedIn = this.login.isLoggedin();
  this.user = this.login.getUser()  // Initialize or provide a default value
  })
}

public logout(){
  this.login.logout();
  //window.location.reload();
  this.isLoggedIn=false;
 
  this.router.navigate(['/login']);
}
}
