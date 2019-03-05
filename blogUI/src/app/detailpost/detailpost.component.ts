import { User } from './../models/user';
import { BlogService } from './../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../models/post';
import { PostSearchParams } from '../models/post-search-params';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})
export class DetailpostComponent implements OnInit {

  id;
  constructor( private route : ActivatedRoute, private location : Location, private formBuilder: FormBuilder, private blogService : BlogService ) { }
  comment: FormGroup;
  post: Post;
  user: User;

  ngOnInit() {
    this.initializeForm();
    this.id = this.route.snapshot.paramMap.get("id");
    this.getUser();
    this.getDataForPost();
  }

  private initializeForm() {
    this.comment = this.formBuilder.group({});
  }

  getDataForPost(){
    let params = new PostSearchParams();
    params.postId = this.id;

    this.blogService.getPosts(params).subscribe(data =>{
      this.post = data[0];
    });
  }

  private getUser(){
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }
}
