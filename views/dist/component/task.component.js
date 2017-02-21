"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var task_service_1 = require("../services/task.service");
var user_service_1 = require("../services/user.service");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var project_service_1 = require("../services/project.service");
var sprint_service_1 = require("../services/sprint.service");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var TaskComponent1 = (function () {
    function TaskComponent1(dragulaService, taskService, sprintService, userService, projectService, route, location) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.taskService = taskService;
        this.sprintService = sprintService;
        this.userService = userService;
        this.projectService = projectService;
        this.route = route;
        this.location = location;
        this.title = "Tasks";
        this.mapTasks = {};
        this.sprintTask = [];
        this.workingTask = [];
        this.stageTask = [];
        this.prodTask = [];
        this.activeAdd = true;
        this.calendarOptions = {
            fixedWeekCount: false,
            aspectRatio: 1,
            defaultDate: new Date(),
            editable: true,
            eventLimit: true,
            events: {
                url: 'http://localhost:3000/scalender/sprint/58a00ec750663108341e99c3qqq',
            },
            eventDrop: function (event, delta) {
                alert(event + ' was moved ' + delta + ' days\n' +
                    '(should probably update your database)');
                console.log("evenr");
                console.log(event);
            },
        };
        this.task1 = {
            id: 1,
            name: 'Build App',
            piority: 1
        };
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.drop.subscribe(function (value) {
            //let [bagName, e, el] = value;
        });
    }
    TaskComponent1.prototype.onSelect = function (task) {
        this.selectedTask = task;
    };
    TaskComponent1.prototype.onDropModel = function (args) {
        var _this = this;
        var el = args[0], target = args[1], source = args[2];
        var tid = el.querySelector('.tid').value;
        var idxOfTask = this.sprintTask.indexOf(tid);
        var idxOfWorking = this.workingTask.indexOf(tid);
        var idxOfStage = this.stageTask.indexOf(tid);
        var idxOfProd = this.prodTask.indexOf(tid);
        console.log(this.sprint._id);
        console.log(target);
        console.log(source);
        this.taskService.updateTaskPosition(this.sprintId, tid, idxOfTask, idxOfWorking, idxOfStage, idxOfProd)
            .subscribe(function (task) {
            console.log(task);
        }, function (error) { return _this.errorMessage = error; });
    };
    TaskComponent1.prototype.getTasks = function () {
        //	this.taskService.getTasks().then(tasks => this.tasks = tasks);;
    };
    TaskComponent1.prototype.ngAfterViewInit = function () {
        console.log("this.sprint");
        console.log(this.sprintId);
        console.log(this.sprint);
        setTimeout(function () {
            // console.log("100ms after ngAfterViewInit ");
            //	$('#calendar').fullCalendar(this.calendarOptions);
        }, 100);
        //	$('#showEvents').fullCalendar(this.calendarOptions);
    };
    TaskComponent1.prototype.ngOnInit = function () {
        var _this = this;
        var id;
        console.log("testin 124556");
        this.route.params.forEach(function (params) {
            id = params['id'];
            console.log("testin -------" + id);
            _this.sprintService.getSprintDetails(id).subscribe(function (sprint) {
                _this.sprint = sprint[0];
                _this.sprintId = sprint[0]._id;
                console.log("data1");
                console.log(sprint);
                _this.getTasksOb();
                _this.getSprintDetails(_this.sprint._id);
                _this.getMembers(_this.sprint.projectId);
            }, function (error) { return _this.errorMessage = error; });
        });
        console.log("new ===============data");
        console.log(this.sprint);
        //this.getTasksOb();	
        //	this.getSprintDetails(this.sprint._id);
        //	this.getMembers();
    };
    /// using promise call
    TaskComponent1.prototype.getHeroes2 = function () {
        var _this = this;
        this.taskService.getHeroes1()
            .then(function (tasks) { return _this.tasks = tasks; }, function (error) { return _this.errorMessage = error; });
    };
    TaskComponent1.prototype.getTasksOb = function () {
        var _this = this;
        console.log("test ------");
        console.log(this.sprint._id);
        var sprintId = this.sprintId;
        this.taskService.getTaskApi(sprintId).subscribe(function (tasks) { _this.tasks = tasks, console.log(_this.tasks), _this.setMapTasks(tasks); }, function (error) { return _this.errorMessage = error; });
    };
    TaskComponent1.prototype.add = function (name, _id, pri, desc, type, asignId, startDate, endDate) {
        var _this = this;
        name = name.trim();
        if (name == "")
            this.formName = "Task Name is required ";
        else {
            startDate = this.formatDate(startDate);
            endDate = this.formatDate(endDate);
            _id = this.sprintId;
            this.taskService.addTask(name, _id, pri, desc, type, asignId, startDate, endDate)
                .subscribe(function (task) {
                _this.sprintTask.push(task['_id']);
                _this.tasks.push(task);
                _this.mapTasks[task['_id']] = {
                    '_id': task['_id'],
                    'name': task['name'],
                    'status': task['status']
                };
            }, function (error) { return _this.errorMessage = error; });
        }
    };
    TaskComponent1.prototype.updateTask = function (_id) {
        var _this = this;
        var editTask = this.selectedTask;
        this.taskService.updateTask(editTask)
            .subscribe(function (task) {
            _this.mapTasks[task['_id']] = {
                '_id': task['_id'],
                'name': task['name'],
                'status': task['status']
            };
            console.log("task");
            console.log(task);
        }, function (error) { return _this.errorMessage = error; });
    };
    TaskComponent1.prototype.delete = function (task) {
        var _this = this;
        this.taskService.deleteTask(task._id).subscribe(function (tasks1) {
            delete _this.mapTasks[task._id];
            _this.deleteFromArray(task);
            console.log(_this.sprintTask);
            _this.getTasksOb();
        }, function (error) { return _this.errorMessage = error; });
    };
    TaskComponent1.prototype.deleteFromArray = function (task) {
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
    };
    TaskComponent1.prototype.getSprintDetails = function (_id) {
        var _this = this;
        this.sprintService.getSprintDetails(_id).subscribe(function (sprint) {
            _this.sprint = sprint;
            _this.sprintUpadated = sprint;
            _this.sprintTask = sprint[0].tasks;
            _this.workingTask = sprint[0].working;
            _this.stageTask = sprint[0].stage;
            _this.prodTask = sprint[0].prod;
        });
    };
    TaskComponent1.prototype.setMapTasks = function (tasks) {
        console.log("enter");
        console.log(tasks);
        var temp = new Array();
        for (var i = 0; i < tasks.length; i++) {
            this.mapTasks[tasks[i]._id] = {
                '_id': tasks[i]._id,
                'name': tasks[i].name,
                'desc': tasks[i].description,
                'type': tasks[i].type,
                'priority': tasks[i].priority,
            };
        }
        console.log("out");
        console.log(this.mapTasks);
    };
    TaskComponent1.prototype.cancel = function () {
        this.activeAdd = true;
    };
    TaskComponent1.prototype.showAdd = function () {
        this.activeAdd = false;
    };
    //users functions
    TaskComponent1.prototype.getMembers = function (projectId) {
        var _this = this;
        this.projectService.getMembers(projectId).subscribe(function (members) { _this.members = members[0].members; console.log("users"); console.log(members[0].members); }, function (error) { return _this.errorMessage = error; });
    };
    TaskComponent1.prototype.addComment = function (comment) {
        var _this = this;
        var taskId = this.selectedTask._id;
        this.taskService.addTaskComment(taskId, comment)
            .subscribe(function (task) { console.log("taskaddd"); console.log(task); }, function (error) { return _this.errorMessage = error; });
    };
    TaskComponent1.prototype.formatDate = function (date) {
        var format = date.toString().split(' ');
        var formatedDate = format[0] + "T" + format[1];
        return formatedDate;
    };
    return TaskComponent1;
}());
TaskComponent1 = __decorate([
    core_1.Component({
        selector: 'my-tasks1',
        templateUrl: 'views/app/component/templates/task.component.html',
        styleUrls: [
            'views/app/component/templates/css/style.css',
        ],
        viewProviders: [ng2_dragula_1.DragulaService],
        providers: [task_service_1.TaskService, user_service_1.UserService, sprint_service_1.SprintService, project_service_1.ProjectService]
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, task_service_1.TaskService, sprint_service_1.SprintService, user_service_1.UserService, project_service_1.ProjectService, router_1.ActivatedRoute, common_1.Location])
], TaskComponent1);
exports.TaskComponent1 = TaskComponent1;
//# sourceMappingURL=task.component.js.map