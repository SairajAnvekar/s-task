import { Component ,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { Http, Response } from '@angular/http';
import {Project} from '../models/project';
import {UserDetails} from '../models/userDetails';

import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'profile',
 	templateUrl: '/../views/app/component/templates/profile.component.html',
	 providers: [UserService],

	})
export class ProfileComponent    { 
  userDetails:any={};
  errorMessage:string;
	public constructor(private router: Router,private UserService:UserService) {}	

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