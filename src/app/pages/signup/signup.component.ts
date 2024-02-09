import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 constructor(private userService:UserService,private  snack:MatSnackBar){}

 public user={
   userName:'',
   password:'',
   fName:'',
   lname:'',
   email:'',
   phone:'',
 }

  formSubmit(){
    console.log(this.user)
    if(this.user.userName==''||this.user.userName==null){
      //alert('user required !!!')
      this.snack.open('User name required','',{
        duration:2000,
        verticalPosition:'top',
        horizontalPosition:'right',
      });
      return;
    }
    //add user:userService
    this.userService.addUser(this.user).subscribe(
       (data:any) => {
        // Success
        console.log(data);
        //alert('Registration Success');
        Swal.fire('Successfully done','user id is '+''+data.id,'success')
      },
      (error) => {
        console.log(error);
        //alert('Something Went Wrong');
        this.snack.open("something went wrong !!!",'',{
          duration: 500,
          horizontalPosition:'right',
          verticalPosition:'top',
        });
      }
    );
    
  }

  //this.user

}
