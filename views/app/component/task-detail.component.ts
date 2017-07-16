import { Component , OnInit,Input,AfterViewInit} 	from '@angular/core';
import { Router }                                   from '@angular/router';
import { ActivatedRoute, Params }  					from '@angular/router';
import { TaskService } 								from '../services/task.service';

@Component({
  selector: 'my-tasks1',
   templateUrl: 'views/app/component/templates/task-detail.component.html',  
  styleUrls: [
        'views/app/component/templates/css/style.css',      
    ],
    providers: [TaskService],
	
  	
})
export class TaskDetailComponent implements OnInit  {

 selectedTask:any;
 errorMessage: string;

public constructor(private router: Router, private route: ActivatedRoute,private taskService:TaskService) {}	

ngOnInit(): void {	
    var id;			
    this.route.params.forEach((params: Params) => {
        id = params['id'];
        console.log(id);
        this.taskService.getTaskDetail(id).subscribe(

        task=>{
            this.selectedTask=task[0];
            console.log(task);
        }
        );


    });			
}
	
    updateTask(_id: string ): void {			
    var editTask=this.selectedTask;     
    this.taskService.updateTask(editTask)
    .subscribe(
    task  =>{
        this.selectedTask=task;
    },
    error => "" );	
    }


	addComment(comment:any): void {			
		var taskId=this.selectedTask._id;

		this.taskService.addTaskComment(taskId,comment)
			.subscribe(
				task  =>{ this.selectedTask=task;console.log("taskaddd");console.log(task)	},
				error =>  this.errorMessage = <any>error);	    
	}


   
}