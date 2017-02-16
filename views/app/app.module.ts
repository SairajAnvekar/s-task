import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, AlertModule } from 'ng2-bootstrap';
import { RouterModule }   from '@angular/router';
import { DashboardComponent }   from './component/dashboard.component';
import {ProjectComponent }   from './component/project.component';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
@NgModule({
  declarations: [AppComponent,DashboardComponent,ProjectComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2DatetimePickerModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        component: DashboardComponent 
      },
      { 
      path: 'project', 
      component: ProjectComponent 
      },

    ])

  ],
  providers: [],
  bootstrap: [AppComponent,]
})

export class AppModule {
}