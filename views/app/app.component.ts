import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'views/app/appComponents.html',
})
export class AppComponent {
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

}