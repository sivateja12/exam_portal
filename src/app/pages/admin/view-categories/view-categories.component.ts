import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})


export class ViewCategoriesComponent  {

  categories=[
    {
      cid:23,
      title:'programming',
      description:"this is testing"
    },
   
    
    
  ]
  constructor(private category:CategoryService,private _snack:MatSnackBar){}
  ngOnInit():void{
this.category.categories().subscribe((data:any)=>{
  this.categories=data;
  console.log(this.categories);
},
(error)=>{
  console.log(error);
  Swal.fire("Error!!", "Error in loadinng data",'error');
}

);
  }

  deleteCategory(cid:any){
    // alert(cid);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure want to delete this category?'
    }
    ).then((result)=>{
      if(result.isConfirmed){
        this.category.deleteCategory(cid).subscribe(
          (data:any)=>{
            this._snack.open('Category Deleted','',{
              duration:3000,
            });
            this.categories=this.categories.filter((c:any)=>c.cid!=cid);
          }
        )
      }

      },
      (error:any)=>{
       
          this._snack.open('Error in delete Question','',{
            duration:3000,
      }
    )}
  )}

}
