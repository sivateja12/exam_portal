import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent {

qId:any;
qTitle:any;
questions:any;
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar){}

  ngOnInit(){
  this.qId=this._route.snapshot.params['qid'];
  this.qTitle=this._route.snapshot.params['title'];
  console.log(this.qId);
    console.log(this.qTitle);
    this._question.getQuizQuestions(this.qId).subscribe((data:any)=>{
      this.questions=data;
    
    },
    (error)=>{
      console.log(error);
    }
    )
  }
  //delete question
  deleteQuestion(qid:any){
    // alert(qid);
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure,want to Delete this question?',
    }).then((result) => {
      if(result.isConfirmed){
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            this._snack.open('Question deleted','',{
              duration:3000,
            });
            this.questions=this.questions.filter((q:any)=>q.quesId!=qid);
          }
        )
      }
    },
    (error)=>{
      this._snack.open('Error in delete Question','',{
        duration:3000,
      })
    }
    )
  }
}
