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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var http_2 = require("@angular/http");
var ProjectService = (function () {
    function ProjectService(http) {
        this.http = http;
        this.appUrl = 'api/project'; // URL to web API
    }
    ProjectService.prototype.getProjects = function () {
        return this.http.get(this.appUrl).map(this.extractData).catch(this.handleError);
    };
    ProjectService.prototype.getProject = function (_id) {
        return this.http.get(this.appUrl + '/' + _id).map(this.extractData).catch(this.handleError);
    };
    ProjectService.prototype.createProject = function (name, desc, startDate, endDate) {
        console.log(startDate);
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.appUrl, { name: name, desc: desc, startDate: startDate, endDate: endDate }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.updateProject = function (project) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.put(this.appUrl, { project: project }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.addMember = function (_id, userId) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.appUrl + '/addProjectMember', { _id: _id, userId: userId }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProjectService.prototype.deleteProject = function (project_id) {
        return this.http.delete(this.appUrl + '/' + project_id).map(this.extractData).catch(this.handleError);
    };
    ProjectService.prototype.getMembers = function (id) {
        return this.http.get(this.appUrl + '/projectMembers/' + id).map(this.extractData).catch(this.handleError);
    };
    ProjectService.prototype.extractData = function (res) {
        console.log(res);
        var body = res.json();
        return body || {};
    };
    ProjectService.prototype.handleError = function (error) {
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
    return ProjectService;
}());
ProjectService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map