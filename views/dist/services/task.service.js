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
//import { TASKS } from './mock-tasks';
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var http_2 = require("@angular/http");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.taskUrl = 'api/tasks'; // URL to web API
    }
    /*getTasks():Promise<Task[]> {
     return Promise.resolve(TASKS);
    }*/
    TaskService.prototype.getTaskApi = function (sprintId) {
        return this.http.get(this.taskUrl + '/sprint/' + sprintId).map(this.extractData).catch(this.handleError);
    };
    TaskService.prototype.getHeroes1 = function () {
        return this.http.get(this.taskUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.addTask = function (name, _id, pri, desc, type, asignId, start, end) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.taskUrl + '/addTasks', { name: name, _id: _id, pri: pri, desc: desc, type: type, asignId: asignId, start: start, end: end }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.updateTask = function (task) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post('api/updateTask', { task: task }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.deleteTask = function (task_id) {
        return this.http.delete('api/task/' + task_id).map(this.extractData).catch(this.handleError);
        ;
    };
    TaskService.prototype.getTaskDetail = function (task_id) {
        return this.http.get('api/task/' + task_id).map(this.extractData).catch(this.handleError);
        ;
    };
    TaskService.prototype.updateTaskPosition = function (_id, tid, pos, posOfWorking, posOfStage, posOfProd) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post('api/task/updateTaskPos', { _id: _id, tid: tid, pos: pos, posOfWorking: posOfWorking, posOfStage: posOfStage, posOfProd: posOfProd }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.addTaskComment = function (_id, comment) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post('api/addComments', { _id: _id, comment: comment }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    TaskService.prototype.extractData = function (res) {
        console.log(res);
        var body = res.json();
        return body.data || {};
    };
    TaskService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map