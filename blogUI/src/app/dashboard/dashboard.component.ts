import { BlogService } from './../services/blog.service';
import { PostSearchParams } from './../models/post-search-params';
import { Post } from './../models/post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../models/user';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route : ActivatedRoute, private location : Location,  private blogService: BlogService) { }
  postList: Post[];
  searchParams: PostSearchParams;

  ngOnInit() {
    $( '.modal-backdrop' ).remove();
    $('body').removeClass('modal-open');
    this.blogService.performSearch.subscribe( id => {
      this.performSearch(id);
    });
    this.blogService.isSaved.subscribe(added => {
      if (added){
        this.performSearch(1);
      }
    });
  }

  performSearch(type: number){
    if (type == null) {
      type = 0;
    }

    this.searchParams = new PostSearchParams();
    let logedUser = this.getUser();
    switch(type){
      case 0:
        this.searchParams.preferences = logedUser.preferences;
        break;
      case 1:
        this.searchParams.userId = logedUser.id;
        break;
      case 2:
        this.searchParams.userId = logedUser.id;
        this.searchParams.liked = true;
        break;
    }

    this.blogService.getPosts(this.searchParams).subscribe(data =>{
      this.postList = data;
    });
  }

  private getUser(){
    return JSON.parse(localStorage.getItem('user')) as User;
  }

}
