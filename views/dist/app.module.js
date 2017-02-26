"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./component/dashboard.component");
var project_component_1 = require("./component/project.component");
var project_detail_component_1 = require("./component/project-detail.component");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
var tabs_1 = require("./component/tabs");
var tab_1 = require("./component/tab");
var task_component_1 = require("./component/task.component");
var profile_component_1 = require("./component/profile.component");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var calendar_1 = require("angular2-fullcalendar/src/calendar/calendar");
var capitalize_pipe_1 = require("./pipe/capitalize.pipe");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent, project_component_1.ProjectComponent, project_detail_component_1.ProjectDetailComponent, profile_component_1.ProfileComponent, task_component_1.TaskComponent1, tabs_1.Tabs, tab_1.Tab, calendar_1.CalendarComponent, capitalize_pipe_1.CapitalizePipe],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            ng2_datetime_picker_1.Ng2DatetimePickerModule,
            ng2_dragula_1.DragulaModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: '/project', pathMatch: 'full' },
                {
                    path: 'dashboard',
                    component: dashboard_component_1.DashboardComponent
                },
                {
                    path: 'project',
                    component: project_component_1.ProjectComponent
                },
                {
                    path: 'detail/:id',
                    component: project_detail_component_1.ProjectDetailComponent
                },
                {
                    path: 'profile',
                    component: profile_component_1.ProfileComponent
                },
                {
                    path: 'sprintDetails/:id',
                    component: task_component_1.TaskComponent1
                },
            ])
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent,]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map