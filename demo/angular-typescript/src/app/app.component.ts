import { ICategoryData } from '../../../..';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FilterKeyword } from './skills-barchart/skills-barchart.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  data: ICategoryData[];
  skillTypeChoice: FilterKeyword = 'ALL';
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<ICategoryData[]>('/demo/data.json')
      .subscribe(data => {
        this.data = data;
      });
  }
}
