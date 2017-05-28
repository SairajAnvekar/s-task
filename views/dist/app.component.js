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
var user_service_1 = require("./services/user.service");
var AppComponent = (function () {
    function AppComponent(UserService) {
        this.UserService = UserService;
        this.userDetails = {};
        this.dt = new Date();
        this.minDate = null;
        this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.dateOptions = {
            formatYear: 'YY',
            startingDay: 1
        };
        this.opened = false;
    }
    AppComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    ;
    AppComponent.prototype.ngAfterViewInit = function () {
        jQuery('.side-menu-links').on('click', function () {
            $(".sidebar-overlay").removeClass("active");
            $(".side-menu").removeClass("toggled");
        });
        jQuery('.sidebar-overlay').on('click', function () {
            $(".sidebar-overlay").removeClass("active");
            $(".side-menu").removeClass("toggled");
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getUsersProfile();
    };
    AppComponent.prototype.getUsersProfile = function () {
        var _this = this;
        this.UserService.getUsersProfile().subscribe(function (userDetails) { return _this.userDetails = userDetails; }, function (error) { return _this.errorMessage = error; });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'views/app/appComponents.html',
        providers: [user_service_1.UserService],
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map