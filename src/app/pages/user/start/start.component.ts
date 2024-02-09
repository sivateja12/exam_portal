import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
qid:any;
questions:any;

marksGot=0
correctAnswers=0
attempted=0
timer:any;
isSubmit=false;
constructor(private localS:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService){}
  ngOnInit():void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuiz();
    }
    loadQuiz(){
      this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
        (data:any)=>{
          this.questions=data;
          this.timer=this.questions.length*2*60;
          // this.questions.forEach((q:any)=>{
          //   q['givenAnswer']='';
          // })
          console.log(this.questions);
          this.startTimer();
        },
        
        (error:any)=>{
          console.log(error);
          Swal.fire("error",'Error loading in quizzes','error');
        }
      )
    }
    preventBackButton(){
      history.pushState(null,'',location.href);
      this.localS.onPopState(()=>
      {
        history.pushState(null,'',location.href);
      }
      )
    }

    submitQuiz(){
      Swal.fire({
        title: "Do you want to submit the exam?",
        
        showCancelButton: true,
        confirmButtonText: "Submit",
        
        icon:'info'
      }).then((e)=>{
        if(e.isConfirmed){
          this.evalQuiz();
        }
      })
    }

    startTimer(){
      let t=window.setInterval(()=>{
         if(this.timer<=100){
          this.evalQuiz();
          clearInterval(t);
         }else{
          this.timer--;
         }
      },1000)
    }

    getFormattedTime(){
      let mm=Math.floor(this.timer/60);
      let ss=this.timer-mm*60;
      return `${mm} min:${ss} sec`;
    }

    public evalQuiz(){
      // this.isSubmit=true;
      //     // calculate marks
      this._question.evalQuiz(this.questions).subscribe(

        (data:any)=>{
          console.log(data);
          this.attempted=data.attempted;
          this.correctAnswers=data.correctAnswers;
          this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
          this.isSubmit=true;
        },(error:any)=>{
          console.log(error);
        }
      )

      //Evaluate at backend
      //     this.questions.forEach((q:any)=>{
      //       if(q.givenAnswer==q.answer){
      //         this.correctAnswers++;
      //         let marks=this.questions[0].quiz.maxMarks/this.questions.length;
      //         this.marksGot+=marks;
      //       }
           
      //       if(q.givenAnswer.trim()!=''){
      //         this.attempted++;
      //       }
      //     }
          
      //     )
      //     console.log(this.questions);
      //     console.log("correct answers"+this.correctAnswers);
      //     console.log("marks got"+this.marksGot);
      //     console.log("attempted"+this.attempted);
    }

    printPage(){
      window.print();
    }
}
