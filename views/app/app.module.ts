import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule }   from '@angular/router';
import { DashboardComponent }   from './component/dashboard.component';
import {ProjectComponent }   from './component/project.component';
import {ProjectDetailComponent }   from './component/project-detail.component';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import {Tabs} from './component/tabs';
import {Tab} from './component/tab';
import { TaskComponent1 } from './component/task.component';
import {LocationStrategy, HashLocationStrategy}  from '@angular/common';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
@NgModule({
  declarations: [AppComponent,DashboardComponent,ProjectComponent,ProjectDetailComponent,TaskComponent1,Tabs,Tab],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2DatetimePickerModule,
     DragulaModule,
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
      { 
        path: 'detail/:id', 
        component: ProjectDetailComponent 
      },
      { 
      path: 'sprintDetails/:id', 
      component: TaskComponent1 
    },

    ])

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent,]
})

export class AppModule {
}