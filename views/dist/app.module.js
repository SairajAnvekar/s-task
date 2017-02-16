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
var ng2_bootstrap_1 = require("ng2-bootstrap");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./component/dashboard.component");
var project_component_1 = require("./component/project.component");
var project_detail_component_1 = require("./component/project-detail.component");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent, project_component_1.ProjectComponent, project_detail_component_1.ProjectDetailComponent],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            ng2_datetime_picker_1.Ng2DatetimePickerModule,
            ng2_bootstrap_1.AlertModule.forRoot(),
            ng2_bootstrap_1.DatepickerModule.forRoot(),
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
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
            ])
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent,]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map