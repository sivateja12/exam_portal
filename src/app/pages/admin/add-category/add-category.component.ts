import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category={
    title:'',
    description:"",
  };
  constructor(private _category:CategoryService,private snack:MatSnackBar){}
  OnInit():void{
    
    }
    formSubmit(){
      if(this.category.title.trim()==''||this.category.title==null){
        this.snack.open("Titled required",'',{duration:2000,})
        return;
      }

      this._category.addCategory(this.category).subscribe(
        (data:any)=>{
          this.category.title='';
          this.category.description='';
        Swal.fire('success!!','category is addedd successfully','success');
      },
      (error)=>{
      console.log(error);
      Swal.fire('Error!!','server error','error');
    });
  }
}
