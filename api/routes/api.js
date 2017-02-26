var express 	= require('express');
var router 		= express.Router();
var Task		= require('../../app/models/tasks.js');
var Sprint	    = require('../../app/models/sprint.js');
var Project		= require('../../app/models/project.js');
var User		= require('../../app/models/user');

//project apis


router.get('/project',function(req, res, next){
	var userId=req.user._id;	
	Project.find({'members.userid':userId},null,{sort:{'_id':-1}},function(err, doc) {	 
	   res.json(doc);		  
	});
});



router.post('/project',function(req,res){
	console.log(req.body);
	var userId=req.user._id;
	var name= req.user.local.fname+" "+req.user.local.lname
	var member={
		name: name,
		userid : userId,
        userdp : "no dp"		 
	 };
	console.log("userId");
	console.log(userId);
	var projectData={
		name:req.body.name,
		desc:req.body.desc,
        createdBy:userId,
		startDate:req.body.startDate,		
		endDate:req.body.endDate,		
	};

	var project=new Project(projectData);
	project.members.push(member);
	project.save(function(err,doc){
		 if (err || !doc) {
            throw 'Error';
        } else {
            res.json(doc);
        }		
	});	
});

router.put('/project',function(req,res){
	console.log(req.body);
	var projectData=req.body.project;	
	Project.findById(projectData._id, function (err, project) {	
        project.name=projectData.name;		
        project.desc=projectData.desc;		
        project.completed=projectData.completed;		
		project.save(function (err) {		
			res.json(project);
		});
	});	
});



router.get('/project/:id',function(req,res){
	Project.find({_id: req.params.id},function(err, doc){	 
	   res.json(doc);		  
	});	
});

router.delete('/project/:id',function(req,res){	 
	  Project.remove({_id: req.params.id},function(err, project){
		  response={status:"not"};
		  console.log(project.ok);
		    console.log(project);
		  if(project.result.ok==1)
		  {
            response.status="ok"
		  }
		  res.json(response);
	  }); 
});

router.post('/project/addProjectMember',function(req, res, next){
	var projectId=req.body._id;
	var userId=req.body.userId;
	User.find({_id:userId},function(err,user){		
		console.log("user id"+userId);		
		console.log(user);
		var name=user[0].local;	
		var member={
		name: name.fname,
		userid : userId,
		userdp : "no dp"		 
		};
		 
		Project.find({'members.userid':userId,_id:projectId},function(err, doc) {		
		
		var send={
				"doc":"alread",
				"erro":doc,
				"member":"already",
				};
			
			if(doc=="" || doc==null)
			Project.findOneAndUpdate({_id:projectId}, {$push: {members: member}}, function(err,project){
				var send={
				"doc":project,
				"erro":doc,
				"member":member,
				};
				Project.find({_id:projectId},function(err, doc) {	
					res.json(doc);
				});			
			});			
			else
				res.json(doc);
				
	
		
		});
		
		
		 
	});
});


router.get("/project/projectMembers/:projectId",function(req,res){
	projectId=req.params.projectId;
	Project.find({'_id':projectId},'members',function(err, doc) {	 
	res.json(doc);		  
	});
});



//end project apis



//sprint apis
router.get('/sprint/project/:projectId',function(req,res)
{
	Sprint.find({projectId: req.params.projectId},null,{sort:{'_id':-1}},function(err, doc){	 
		res.json({"data":doc});		  
	});
	
});

router.post('/sprint',function(req,res){
	console.log(req.body);
	var sprintData={
		name:req.body.name,
		desc:req.body.desc,
		projectId:req.body.projectId
	};
	var sprint=new Sprint(sprintData);
	sprint.save(function(err,doc){
		 if (err || !doc) {
            throw 'Error';
        } else {
            res.json({"data":doc});
        }		
	});	
});

//end sprint apis



//users apis
router.get('/users',function(req,res){
	User.find({},function(err, doc){	 
		res.json({"data":doc});		  
	});
});
//end user api




//task api
router.post('/tasks/addTasks',function(req, res){
	console.log(req.body);
	var sprintId=req.body._id;
	var desc=req.body.desc;
	var type=req.body.type;
	var asigId=req.body.asignId;
	var start=req.body.start;
	var end=req.body.end;
	TaskObj = {
		id:req.body._id,
		priority:req.body.pri,
		name:req.body.name,
		description:desc,
		type:type,
		asign_to_id:asigId,
		start:start,
		end:end,
	};
	var task= new Task(TaskObj)
	task.save(function (err, doc) {
        if (err || !doc) {
            throw 'Error';
        } else {
            res.json({"data":doc});
        }
		 
		 sprintTask={
			 taskId:doc._id,
		 };
		Sprint.update({_id:sprintId}, {$push: {tasks:doc._id}}, function(err){
		if(err){
				console.log(err);
		}else{
				console.log("Successfully added");
		}
		
	});
		
		
    });
});




router.get('/tasks/sprint/:id',function(req,res)
{
 Task.find({id: req.params.id},function(err, task) {	 
	   res.json({"data":task});		  
	});
	
});





router.get('/task/:id',function(req,res)
{
 Task.find({_id: req.params.id},function(err, user) {	 
	   res.json({"data":user});	

	   
	});
	
});




router.delete('/task/:id',function(req,res){
	 Task.remove({_id: req.params.id},function(err, user) {	 	 
       console.log(req.params.id);
	   
	   Sprint.update({tasks:req.params.id},{ $pullAll: {tasks: [req.params.id] }},function(err, user) {		   
		    
             
			Sprint.update({working:req.params.id},{ $pullAll: {working: [req.params.id] }},function(err, task) {

				
				Sprint.update({stage:req.params.id},{ $pullAll: {stage: [req.params.id] }},function(err, task) {

					Sprint.update({prod:req.params.id},{ $pullAll: {prod: [req.params.id] }},function(err, task) {

						res.json({"data":task});

					});	

				});	

			});	
				

			
	   });	  	  
	});
});

router.post('/task/updateTaskPos',function(req, res){
	
	var sprintId=req.body._id;
	var pos=req.body.pos;
	var posWorking=req.body.posOfWorking;
	var posStage=req.body.posOfStage;
	var posProd=req.body.posOfProd;
	
	var taskId=req.body.tid;
	var result=[];
	
	 Sprint.update({tasks:taskId},{ $pullAll: {tasks: [taskId] }},function(err, doc) {  

		Sprint.update({ _id:sprintId },{$push: {tasks: {$each: [taskId], $position: pos}}},function(err, doc) {
			
			result.push({"data":doc});			 
			Sprint.update({working:taskId},{ $pullAll: {working: [taskId] }},function(err, doc) {			
				Sprint.update({ _id:sprintId },{$push: {working: {$each: [taskId], $position: posWorking}}},function(err, doc) {
					result.push({"data":doc});
					
					Sprint.update({stage:taskId},{ $pullAll: {stage: [taskId] }},function(err, doc) {  
						Sprint.update({ _id:sprintId },{$push: {stage: {$each: [taskId], $position: posStage}}},function(err, doc) {
							result.push({"data":doc});
						
						 
							Sprint.update({prod:taskId},{ $pullAll: {prod: [taskId] }},function(err, doc) {  
								Sprint.update({ _id:sprintId },{$push: {prod: {$each: [taskId], $position: posProd}}},function(err, doc) {
									result.push({"data":doc});

									res.json(result);
								})
							});								 
						})
					});	

				})

			});	
			
		})
			
	 });	
	   
	   
	   


	
});




router.get('/task/scalender/sprint/:id',function(req,res)
{	
	Task.aggregate([
		{$match:{id: req.params.id}},
		{ $project: {
			_id:0,
			id: '$_id',
			title:'$name',
			start:1,
			end:1,
			backgroundColor:1,
		}}
		
	],function(err,result){

		res.json(result); 
	});

});



//end task

router.get('/',function(req,res,next) {   
    res.json('home');
});


router.get('/sprint/:id',function(req,res,next) {   
      Sprint.find({_id: req.params.id},function(err, doc){	 
	   res.json({"data":doc});       
	});
});


router.get('/sprint5',function(req,res,next) { 
	   console.log("eeeeeeeeeeeeeeeeeeeeee")	   
});


router.post('/addTask',function(req, res, next){
	TaskObj = {          
	   priority:1,
	   name:req.body.name,
	   status:req.body.status,
	};	
	
	var sprintId=req.body.sId
	Sprint.update({_id:sprintId}, {$push: {tasks: TaskObj}}, {upsert:true}, function(err){
		if(err){
				console.log(err);
		}else{
				console.log("Successfully added");
		}
	});

	Sprint.find({_id:sprintId},function(err, sprint){
		   res.json({"data":sprint});	
	});

});




router.post('/addComments',function(req,res){
	var taskId=req.body._id;
    var comment=req.body.comment;
	var user=req.user;
	  var comments={
		  comment:comment,
		  userid:user._id,
		  userdp:'ffdgg',
	  };
	  
	 	Task.findOneAndUpdate({_id:taskId}, {$push: {comments: comments}}, {upsert:true}, function(err,task){
			res.json({"data":task});			
		});
	 
	 
});

router.post('/updateTask',function(req,res){
	var taskId=req.body._id;
	var reqTask=req.body.task;
	
	Task.findById(reqTask._id, function (err, task) {
		if (err) return handleError(err);
         
		task.status=reqTask.status;
		task.progress=reqTask.progress;
		task.priority=reqTask.priority;
		task.description=reqTask.description;
		task.asign_to_id=reqTask.asign_to_id;
		task.backgroundColor=reqTask.backgroundColor;
		task.save(function (err, updatedTask) {
		if (err) return handleError(err);
			res.json({"data":updatedTask});
		});
	});
	console.log(reqTask);

	
}
);

module.exports = router;