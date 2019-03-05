import { Post } from './../models/post';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  postList: Post[];

  ngOnInit() {
    $( '.modal-backdrop' ).remove();
  }

}
