import { Action } from './../models/action';
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
  likeCount: number;
  comentCount: number;
  user: User;
  isAlreadyLiked: boolean;
  ActionPrevius: Action;

  ngOnInit() {
    this.initializeForm();
    this.id = this.route.snapshot.paramMap.get("id");
    this.getUser();
    this.getDataForPost();
  }

  private initializeForm() {
    this.comment = this.formBuilder.group({
      commentAdded: ''
    });
  }

  getDataForPost(){
    let params = new PostSearchParams();
    params.postId = this.id;

    this.blogService.getPosts(params).subscribe(data =>{
      this.post = data[0];
      this.likeCount = this.post.likeCount;
      this.comentCount = this.post.commentCount;
      this.isAlreadyLiked = (this.post.actions.filter(l => l.actionType === 1 && l.ownerAction.id === this.user.id)).length !== 0;
      // tslint:disable-next-line:max-line-length
      this.ActionPrevius = (this.post.actions.filter(l => l.ownerAction.id === this.user.id && (l.actionType === 1 || l.actionType === 0)))[0];
    });
  }

  private getUser(){
    this.user = JSON.parse(localStorage.getItem('user')) as User;
  }

  addLike(){
    let useUpdate = true;
    if (typeof this.ActionPrevius === 'undefined') {
      this.ActionPrevius = new Action();
      useUpdate = false;
    }
    this.ActionPrevius.post = this.id;
    this.ActionPrevius.ownerAction = this.user;

    if (this.isAlreadyLiked){
      this.isAlreadyLiked = false;
      this.likeCount = this.likeCount - 1;
      this.ActionPrevius.actionType = 0;
    } else {
      this.isAlreadyLiked = true;
      this.likeCount = this.likeCount + 1;
      this.ActionPrevius.actionType = 1;
    }

    if (useUpdate){
      this.blogService.updateAction(this.ActionPrevius).subscribe(data => { this.ActionPrevius = data; } );
    } else {
      this.blogService.createAction(this.ActionPrevius).subscribe(data => {
        const result = data;
        this.ActionPrevius = (result.actions.find(l => l.ownerAction.id === this.user.id && l.actionType === 1 ));
      });
    }


  }

  addComment(){
    this.comentCount = this.comentCount + 1;
  }

  editComment(elementInput){

  }

}
