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
var router_1 = require("@angular/router");
var ProjectComponent = (function () {
    function ProjectComponent(router, projectService) {
        this.router = router;
        this.projectService = projectService;
        this.activeAddDetails = true;
        this.progress = " c100 green ";
        this.percentage = " p45";
    }
    ProjectComponent.prototype.ngOnInit = function () {
        this.getProjects();
    };
    ProjectComponent.prototype.onSelect = function (project) {
        this.selectedProject = project;
        this.gotoDetail();
    };
    ProjectComponent.prototype.create = function (name, desc, sdate, endDate) {
        var _this = this;
        name = name.trim();
        var str = "" + sdate;
        var time = str.split(' ');
        sdate = time[0] + "T" + time[1];
        console.log(sdate);
        var formatendDate = endDate.toString().split('');
        this.projectService.createProject(name, desc, sdate, endDate)
            .subscribe(function (project) { return console.log(project); }, function (error) { return _this.errorMessage = error; });
        this.getProjects();
        this.cancel();
    };
    ProjectComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.getProjects().subscribe(function (projects) { return _this.projects = projects; }, function (error) { return _this.errorMessage = error; });
    };
    ProjectComponent.prototype.deleteProject = function (projectId) {
        var _this = this;
        this.projectService.deleteProject(projectId).subscribe(function (project) {
            if (project.status == "ok") {
                console.log("deleted");
                for (var i = 0; i < _this.projects.length; i++) {
                    if (_this.projects[i]._id == projectId) {
                        _this.projects.splice(i, 1);
                    }
                }
            }
        });
    };
    ProjectComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedProject._id]);
        console.log("test");
    };
    ProjectComponent.prototype.showAddDetails = function () {
        this.activeAddDetails = false;
    };
    ProjectComponent.prototype.cancel = function () {
        this.activeAddDetails = true;
    };
    return ProjectComponent;
}());
ProjectComponent = __decorate([
    core_1.Component({
        selector: 'my-project',
        templateUrl: 'views/app/component/templates/project.component.html',
        providers: [project_service_1.ProjectService],
    }),
    __metadata("design:paramtypes", [router_1.Router, project_service_1.ProjectService])
], ProjectComponent);
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=project.component2.js.map