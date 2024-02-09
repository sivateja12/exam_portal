import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {


  qId:any;
  quiz:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router){}

  ngOnInit(){

    this.qId=this._route.snapshot.params['qid'];
    // alert(this.qId);

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
      },
      (error:any)=>{
        alert("Error in loding Quiz");
      }
    )
  }

  startQuiz(){
    Swal.fire({
      title: "Do you want to start the exam?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Start",
      denyButtonText: `cancel`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qId])
      } else if (result.isDenied) {
        Swal.fire("Quiz not started", "", "info");
      }
    });
  }
}
