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
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var task_service_1 = require("../services/task.service");
var TaskDetailComponent = (function () {
    function TaskDetailComponent(router, route, taskService) {
        this.router = router;
        this.route = route;
        this.taskService = taskService;
    }
    TaskDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id;
        this.route.params.forEach(function (params) {
            id = params['id'];
            console.log(id);
            _this.taskService.getTaskDetail(id).subscribe(function (task) {
                _this.selectedTask = task[0];
                console.log(task);
            });
        });
    };
    TaskDetailComponent.prototype.updateTask = function (_id) {
        var _this = this;
        var editTask = this.selectedTask;
        this.taskService.updateTask(editTask)
            .subscribe(function (task) {
            _this.selectedTask = task;
        }, function (error) { return ""; });
    };
    return TaskDetailComponent;
}());
TaskDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-tasks1',
        templateUrl: 'views/app/component/templates/task-detail.component.html',
        styleUrls: [
            'views/app/component/templates/css/style.css',
        ],
        providers: [task_service_1.TaskService],
    }),
    __metadata("design:paramtypes", [router_1.Router, router_2.ActivatedRoute, task_service_1.TaskService])
], TaskDetailComponent);
exports.TaskDetailComponent = TaskDetailComponent;
//# sourceMappingURL=task-detail.component.js.map