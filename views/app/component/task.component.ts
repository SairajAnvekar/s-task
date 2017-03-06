import { Component , OnInit,Input,AfterViewInit} 	from '@angular/core';
import {Task}										from '../models/task';
import { TaskService } 								from '../services/task.service';
import { UserService } 								from '../services/user.service';
import { Http, Response }							from '@angular/http';
import { Headers, RequestOptions }					from '@angular/http';
import { DragulaService } 							from 'ng2-dragula/ng2-dragula';
import { ProjectService } 							from '../services/project.service';
import { SprintService } 							from '../services/sprint.service';
import { ActivatedRoute, Params }  					from '@angular/router';
import { Location }                 				from '@angular/common';
import * as $ 										from 'jquery';
import 'fullcalendar';

@Component({
  selector: 'my-tasks1',
  templateUrl: 'views/app/component/templates/task.component.html',  
   styleUrls: [
        'views/app/component/templates/css/style.css',      
    ],	
  	viewProviders: [DragulaService],
    providers: [TaskService,UserService,SprintService,ProjectService],

})
export class TaskComponent1 implements OnInit , AfterViewInit{
	title="Tasks";	
	sprint:any;
	members:any;
	sprintId:string;
	mapTasks:{[id:string]:any}={};	  
	sprintUpadated:any;
	errorMessage: string;
	sprintTask:any=[];
	workingTask:any=[];
	stageTask:any=[];
	prodTask: any=[];
	activeAdd=true;
    formName:string;
     model:any;


	calendarOptions:Object = {      
			fixedWeekCount : false,
			aspectRatio: 1,			
			defaultDate: new Date(),
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			events: {
			url: 'http://localhost:5000/scalender/sprint/58a00ec750663108341e99c3qqq',
			},
			eventDrop: function (event:any, delta:any) {
			alert(event + ' was moved ' + delta + ' days\n' +
			'(should probably update your database)');
							console.log("evenr");
								console.log(event);
			},
      };
   	
	task1: Task ={
					id: 1,
					name: 'Build App',
					 piority:1
				};
				
	tasks:Task[]; 
	selectedTask: any;
	onSelect(task: Task): void {
		this.selectedTask = task;
	}

    public constructor(private dragulaService:DragulaService,private taskService:TaskService,private sprintService: SprintService,private userService: UserService, private projectService:ProjectService, private route: ActivatedRoute,private location: Location) {
	  
		dragulaService.dropModel.subscribe((value:any) => {
		this.onDropModel(value.slice(1));

		});
		
		dragulaService.drop.subscribe((value:any) => {
		//let [bagName, e, el] = value;
	
	});
	
	 this.model = {
            sex: "female"
        };
		
	
	
  }
	
	
	private onDropModel(args:any):void {
		let [el, target, source] = args;		
	    var tid=el.querySelector('.tid').value;
		var idxOfTask=this.sprintTask.indexOf(tid);		
		var  idxOfWorking=this.workingTask.indexOf(tid);
		var  idxOfStage=this.stageTask.indexOf(tid);
		var  idxOfProd=this.prodTask.indexOf(tid);	
		
		
		console.log(this.sprint._id);
		console.log(target);
		console.log(source);
		this.taskService.updateTaskPosition(this.sprintId,tid,idxOfTask,idxOfWorking,idxOfStage,idxOfProd)
					 .subscribe(
					   task  =>{						   
							console.log(task);
							},
					   error =>  this.errorMessage = <any>error);
		
	}
	


		ngAfterViewInit(){
			console.log("this.sprint");
			console.log(this.sprintId);
			console.log(this.sprint);
			setTimeout(()=>{
			// console.log("100ms after ngAfterViewInit ");
			//	$('#calendar').fullCalendar(this.calendarOptions);

			}, 100);

		}
		ngOnInit(): void {	
			var id;			
			this.route.params.forEach((params: Params) => {
				id = params['id'];
			
				this.sprintService.getSprintDetails(id).subscribe(
					sprint =>{
						this.sprint=sprint[0];
						this.sprintId=sprint[0]._id;
						console.log("data1");
						console.log(sprint);
						this.getTasksOb();
						this.getSprintDetails(this.sprint._id);
						this.getMembers(this.sprint.projectId);
						this.calendarOptions['events'].url='/api/task/scalender/sprint/'+this.sprint._id;
						console.log(this.calendarOptions);
						$('#showEvents').fullCalendar(this.calendarOptions);
						},
					error =>  this.errorMessage = <any>error
				);

			});			
	}
	
	
	
	getTasksOb() {
		console.log("test ------");
		console.log(this.sprint._id);
		var sprintId=this.sprintId;
		this.taskService.getTaskApi(sprintId).subscribe(
			tasks => {this.tasks = tasks,console.log(this.tasks),this.setMapTasks(tasks)},
			error =>  this.errorMessage = <any>error
		);
	}
	
	add(name: string,_id: string ,pri:number,desc:string,type:string,asignId:string,startDate:string,endDate:string): void {
	   name = name.trim();
        if(name=="")
         	this.formName="Task Name is required ";		
	    else{  
	
				startDate=this.formatDate(startDate);
				endDate=this.formatDate(endDate);
  	   
			_id=this.sprintId;
				this.taskService.addTask(name,_id,pri,desc,type,asignId,startDate,endDate)
						 .subscribe(
						   task  =>{						   
								this.sprintTask.push(task['_id']);						
								this.tasks.push(task);
								this.mapTasks[task['_id']]={
																'_id':task['_id'],
																'name':task['name'],
																'status':task['status']

								}		
                                    $('#showEvents').fullCalendar( 'refetchEvents' );
								},
						   error =>  this.errorMessage = <any>error);	     
			
		}
	}
	
	updateTask(_id: string ): void {			
		 var editTask=this.selectedTask;     
		this.taskService.updateTask(editTask)
					 .subscribe(
					   task  =>{this.mapTasks[task['_id']]={
															'_id':task['_id'],
															'name':task['name'],
															'status':task['status']	};
															console.log("task");console.log(task);
															 $('#showEvents').fullCalendar( 'refetchEvents' );
							},
					   error =>  this.errorMessage = <any>error);	
	}
	
	delete(task:any): void {
			this.taskService.deleteTask(task._id).subscribe(
				tasks1 => {
					delete this.mapTasks[task._id];
					this.deleteFromArray(task);
					console.log(this.sprintTask);
					this.getTasksOb();
				},
				error =>  this.errorMessage = <any>error
				);			
	}
	
	deleteFromArray(task:any)
	{
		var idx = this.sprintTask.indexOf(task._id);
				if (idx != -1) {
				   this.sprintTask.splice(idx, 1); // The second parameter is the number of elements to remove.
				} 
		idx = this.workingTask.indexOf(task._id);
				if (idx != -1) {
				   this.workingTask.splice(idx, 1); // The second parameter is the number of elements to remove.
				} 
		idx = this.stageTask.indexOf(task._id);
				if (idx != -1) {
				   this.stageTask.splice(idx, 1); 
				}
		idx = this.prodTask.indexOf(task._id);
				if (idx != -1) {
				   this.prodTask.splice(idx, 1); 
				}		
	}
	
	
	getSprintDetails(_id:any)
	{
		this.sprintService.getSprintDetails(_id).subscribe(
		
			sprint=>{
				this.sprint=sprint;
				this.sprintUpadated=sprint;		
				this.sprintTask=sprint[0].tasks;
				this.workingTask=sprint[0].working;
				this.stageTask=sprint[0].stage;
				this.prodTask=sprint[0].prod;		  
			  }
		
		);
	}
	
	
	setMapTasks(tasks:any)
	{   
	console.log("enter");
	console.log(tasks);
	var temp= new Array();
		for(var i=0;i<tasks.length;i++)
		{
			 
			
			this.mapTasks[tasks[i]._id]={
				'_id':tasks[i]._id,
				'name':tasks[i].name,
				'desc':tasks[i].description,
				'type':tasks[i].type,
				'priority':tasks[i].priority,			
				
			}		
			
			
		}
		
		console.log("out");
		
		console.log(this.mapTasks);	
	}
	
	
	cancel()
	{				
		this.activeAdd=true;
	}
	
	showAdd()
	{
		this.activeAdd=false;		
	}
	
	//users functions
	
	getMembers(projectId:any) {		
		this.projectService.getMembers(projectId).subscribe(
			members => {this.members = members[0].members;console.log("users");console.log(members[0].members)},
			error =>  this.errorMessage = <any>error
		);
	}
	
	
	
	addComment(comment:any): void {			
		var taskId=this.selectedTask._id;

		this.taskService.addTaskComment(taskId,comment)
			.subscribe(
				task  =>{console.log("taskaddd");console.log(task)	},
				error =>  this.errorMessage = <any>error);	    
	}




	formatDate(date:any){
		var format=date.toString().split(' ');
		var formatedDate=format[0]+"T"+format[1];
 		return formatedDate;
	} 

	
}





