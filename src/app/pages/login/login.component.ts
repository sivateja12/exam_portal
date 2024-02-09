import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData={
    username:'',
    password:''
  };
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router,private loginStatusSubject:LoginService){}
  formSubmit(){
    console.log("button clicked");
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.snack.open("Username required!!!","",{
        duration:2000,});
        return;
    }

    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open("password required!!!","",{
        duration:2000,});
        return;
    }
  

    //request server to generate token

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);

        //Login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect   ADMIN   admin dashboard
            //redirect   NORMAL  normal dashboard
            if(this.login.getUserRole()=="ADMIN"){
                //admin daashboard
                //window.location.href='/admin';

                this.router.navigate(['admin']);
                this.login.loginStatusSubject.next(true)

            }else if(this.login.getUserRole()=="NORMAL"){
              //normal user dashboard
              //window.location.href='/userdashboard';
              this.router.navigate(['userdashboard/0']);
              this.login.loginStatusSubject.next(true)

            }else{
              this.login.logout();
            }

            
          }
        )
      },
      (error)=>{
        console.log("Error");
        console.log(error);
        this.snack.open("Invalid Details !!! Try again","",{
          duration:2000
        }
        );
      }
    )
  }


}
