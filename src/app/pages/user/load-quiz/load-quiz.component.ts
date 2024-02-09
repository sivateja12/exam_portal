import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {

cId:any;
quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService){}

  ngOnInit(){
this._route.params.subscribe((params)=>{
  this.cId=params['cId'];
    if(this.cId==0){
      this._quiz.getActiveQuizzes().subscribe(
        (data:any)=>{
          this.quiz=data;
        },
        (error:any)=>{
          alert('Error in Loading All Quizzes');
        }
      )
      // console.log("Load all the Quizzes");
    }else{
      console.log("load specified quizzes");
      // console.log(this.cId);
      this._quiz.getCategoryActive(this.cId).subscribe(
        (data:any)=>{
          this.quiz=data;
        },
        (error:any)=>{
          alert('Error in loading Quizzes');
        }
      )
    }
})
    
    // console.log(this.cId);
  }
}
