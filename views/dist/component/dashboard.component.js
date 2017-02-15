"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.many = ['The', 'possibilities', 'are', 'endless!'];
        this.many2 = [];
        this.groups = [
            {
                name: 'Group A',
                items: ['Item A', 'Item B', 'Item C', 'Item D']
            },
            {
                name: 'Group B',
                items: ['Item 1', 'Item 2', 'Item 3', 'Item 4']
            }
        ];
    }
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        template: "\n   <div class='wrapper'>\n        <div class='container'  >\n            wellcome to Dahboard 1\n    </div>\n\t\n\t<div>\n\t\n \n  \n\t",
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map