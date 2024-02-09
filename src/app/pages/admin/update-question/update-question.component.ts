import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {

  qId: any;
  qTitle: any;
  question = {
    quiz: { qid: '' },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  constructor(private _route: ActivatedRoute, private _question: QuestionService,private _router:Router) {}
 
  ngOnInit(): void {
    
    this.qId = this._route.snapshot.params['quesId'];    // this.qTitle = this._route.snapshot.params['qTitle'];
    // this.question.quiz['qid'] = this.qId;
    // console.log(this.qId);
    this._question.getQuestion(this.qId).subscribe(
      (data:any)=>{
        this.question=data;
      },
      (error:any)=>{
        console.log(error);
      }
    )
    // alert(this.qId);
  }
  public updateData(){
    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question Updated','success').then(()=>{
          this._router.navigate(["'/admin/view-questions/' + q.qid + '/' + q.title"])
        });
      },
      (error)=>{
        Swal.fire('Error','Error Updating Quiz','error');
      }
    )
  }
 
}
