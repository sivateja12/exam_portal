import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {

constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService,private _router:Router){}
qId=0;
quiz:any;
categories:any=[];
ngOnInit(): void{
  this.qId = this._route.snapshot.params['qid'];
  this._quiz.getQuiz(this.qId).subscribe(
    (data)=>{
      // Swal.fire('success',"Success Fully Updated!!!","success")
      this.quiz=data;
      console.log(this.quiz);
    },
    (error)=>{
      console.log(this.quiz);
    }
  )

  // alert(this.qId);
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        alert('error in retrieving categories');
      }
    )
}
//update form data
public updateData(){
  // alert('testing');
  this._quiz.updateQuiz(this.quiz).subscribe(
    (data:any)=>{
      Swal.fire('success','Successfully Updated!!!','success').then((e)=>{
        this._router.navigate(['/admin/quizzes'])
      })
    },
    (error:any)=>{
      Swal.fire('error','Error During Updating!','error')
    }
  )

}
}
