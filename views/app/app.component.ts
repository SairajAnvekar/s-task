import {Component} from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'my-app',
  templateUrl: 'views/app/appComponents.html',
   providers: [UserService],
})
export class AppComponent {
   userDetails:any={};
  errorMessage:string;
  public dt:Date = new Date();
  private minDate:Date = null;
  private events:Array<any>;
  private tomorrow:Date;
  private afterTomorrow:Date;
  private formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  private format = this.formats[0];
  private dateOptions:any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened:boolean = false;

  public getDate():number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

public constructor(private UserService:UserService) {};
ngAfterViewInit() {
    jQuery('.side-menu-links').on('click', () => {    
     $(".sidebar-overlay").removeClass("active");
     $(".side-menu").removeClass("toggled");
    });

   jQuery('.sidebar-overlay').on('click', () => {    
     $(".sidebar-overlay").removeClass("active");
     $(".side-menu").removeClass("toggled");
    });


}


 ngOnInit(): void {	
    this.getUsersProfile() ;
  }

  getUsersProfile() {
		this.UserService.getUsersProfile().subscribe(
			userDetails => this.userDetails = userDetails,
			error =>  this.errorMessage = <any>error
		);
	}

}