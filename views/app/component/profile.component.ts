import { Component ,OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Http, Response } from '@angular/http';
import {Project} from '../models/project';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'profile',
   template: 'heloooo',
	 providers: [ProjectService],

	})
export class ProfileComponent    { 


}