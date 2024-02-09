import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new BehaviorSubject<boolean>(false); // Initialize with an initial value (false)
  constructor(private http:HttpClient) { }


  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }
  //generate-token
  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`,loginData);

  }
//login user: sert token in local storage
public loginUser(token:any){
  localStorage.setItem("token",token)
  return true;
}


//is login:loggedin or not

public isLoggedin(){
  let tokenStr=localStorage.getItem("token");
  if(tokenStr==undefined||tokenStr==''||tokenStr==null){
    return false;
  }
  else{
    return true;
  }
}

//logout:remove token from local storage

public  logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return true;
}

//getToken : returns token

public getToken(){
  return localStorage.getItem("token");
}

//set user detail
public setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user));
}


//get User
public getUser(){
  let userStr=localStorage.getItem('user');
  if(userStr!=null){
    return JSON.parse(userStr);
  }
  else{
    this.logout();
    return null;
  }
}


//get user role

public getUserRole(){
  let user=this.getUser();
  return user.authorities[0].authority;
}
}
