import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'my-dashboard',
  template: `
   <div class='wrapper'>
        <div class='container'  >
            wellcome to Dahboard 1
    </div>
	
	<div>
	
 
  
	`,


})
export class DashboardComponent   { 
  public many:Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  public many2:Array<string> = [];

  errorMessage: string;
   public groups: Array<any> = [
    {
      name: 'Group A',
      items: ['Item A','Item B','Item C','Item D']
    },
    {
      name: 'Group B',
      items: ['Item 1','Item 2','Item 3','Item 4']
    }
  ];

  }
  
  
 
	
	
