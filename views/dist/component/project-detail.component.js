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
var project_service_1 = require("../services/project.service");
var sprint_service_1 = require("../services/sprint.service");
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(projectService, sprintService, userService, route, location, router) {
        this.projectService = projectService;
        this.sprintService = sprintService;
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.project = {};
        this.progress = " c100 green ";
        this.percentage = " p45";
        this.title = "Tasks";
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id;
        this.route.params.forEach(function (params) {
            id = params['id'];
            _this.projectService.getProject(id).subscribe(function (project1) {
                _this.project = project1[0];
                console.log("api return");
                console.log(_this.project[0]);
                _this.title = project1[0].name;
                _this.projectDetails = project1[0];
            }, function (error) { return _this.errorMessage = error; });
        });
        this.getTasksOb(id);
        this.getUsers();
        console.log("data");
        console.log(this.project);
    };
    ProjectDetailComponent.prototype.create = function (name, desc) {
        var _this = this;
        this.sprintService.createSprint(name, desc, this.project._id)
            .subscribe(function (project) { return console.log(project); }, function (error) { return _this.errorMessage = error; });
        this.getTasksOb(this.project._id);
    };
    ProjectDetailComponent.prototype.update = function (project) {
        var _this = this;
        this.projectService.updateProject(project).subscribe(function (project) { return console.log(project); }, function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.getTasksOb = function (projectid) {
        var _this = this;
        this.sprintService.getProjectSprint(projectid).subscribe(function (sprints) { _this.sprints = sprints; console.log("data"); console.log(_this.sprints); }, function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.onSelect = function (sprint) {
        this.currentSprint = sprint;
        this.router.navigate(['/sprintDetails', this.currentSprint._id]);
        console.log("current sprint");
        console.log(this.currentSprint);
    };
    ProjectDetailComponent.prototype.addTask = function (name, status) {
        var _this = this;
        name = name.trim();
        this.sprintService.addTask(name, status, this.currentSprint._id)
            .subscribe(function (task) { return console.log(task); }, function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (users) { _this.users = users; console.log("users"); console.log(users); }, function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.addMember = function (member) {
        var _this = this;
        this.projectService.addMember(this.project._id, member)
            .subscribe(function (project) { _this.project = project[0]; console.log("wwwwwwwwwwwwww"); console.log(project); }, function (error) { return _this.errorMessage = error; });
    };
    ProjectDetailComponent.prototype.deleteSprint = function (id) {
        var _this = this;
        this.sprintService.deleteSprint(id).subscribe(function (sprint) {
            console.log("s1");
            console.log(sprint);
            if (sprint.status == "ok") {
                for (var i = 0; i < _this.sprints.length; i++) {
                    console.log(_this.sprints[i]);
                    if (_this.sprints[i]._id == id) {
                        _this.sprints.splice(i, 1);
                    }
                }
            }
        });
    };
    return ProjectDetailComponent;
}());
ProjectDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-project1',
        templateUrl: '/../views/app/component/templates/project-detail.component.html',
        providers: [project_service_1.ProjectService, sprint_service_1.SprintService, user_service_1.UserService],
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        sprint_service_1.SprintService,
        user_service_1.UserService,
        router_2.ActivatedRoute,
        common_1.Location,
        router_1.Router])
], ProjectDetailComponent);
exports.ProjectDetailComponent = ProjectDetailComponent;
//# sourceMappingURL=project-detail.component.js.map