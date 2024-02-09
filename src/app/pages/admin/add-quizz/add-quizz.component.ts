import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css']
})
export class AddQuizzComponent  {
 categories:any=[];
 quizData={
  title:'',
  description:'',
  maxMarks:'',
  noOfQuestions:'',
  active:true,
  category:{
    cid:'',
  },

 }
 constructor(private _cat:CategoryService,private snack:MatSnackBar,private _quiz:QuizService){}
 ngOnInit(): void{
  this._cat.categories().subscribe(
    (data:any)=>{
    //categories load
    this.categories=data;
    console.log(this.categories);

    },
    (error)=>{
      console.log(error);
      Swal.fire("Error","Error from server!!",'error')
    }
    )
 }

 //add quiz

 public quizAdd(){
  //console.log(this.quizData);
  if(this.quizData.title.trim()==''||this.quizData.title.trim()==null){
    this.snack.open("Title requied!!!",'',{
      duration:2000,
    })
    return;
  }


  //call from server
  this._quiz.addQuiz(this.quizData).subscribe(
    (data:any)=>
    {
      Swal.fire('success','Quiz Is Added!!!','success')
      this.quizData=data;
      return true;
    },
    (error)=>{
      Swal.fire('error','unable to add Quiz','error');
      console.log(error);
    }
  )
 }
}
