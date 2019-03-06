import { Action } from './../models/action';
import { User } from './../models/user';
import { BlogService } from './../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../models/post';
import { PostSearchParams } from '../models/post-search-params';
declare var $: any;

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})
export class DetailpostComponent implements OnInit {

  id;
  constructor( private route : ActivatedRoute, private location : Location, private formBuilder: FormBuilder, private blogService : BlogService ) { }
  commentForm: FormGroup;
  post: Post;
  likeCount: number;
  comentCount: number;
  user: User;
  isAlreadyLiked: boolean;
  readyToSave = true;
  ActionPrevius: Action;
  comments: Action[];
  commentToShow: number;

  ngOnInit() {
    this.initializeForm();
    this.id = this.route.snapshot.paramMap.get("id");
    this.getUser();
    this.getDataForPost();
  }

  private initializeForm() {
    this.commentForm = this.formBuilder.group({
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
      this.comments = this.post.actions.filter(a => a.actionType === 2);
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
    let commentToAdd =  new Action();
    commentToAdd.actionType = 2;
    commentToAdd.comment =this.commentForm.value.commentAdded;
    commentToAdd.post = this.id;
    commentToAdd.ownerAction = this.user;

    this.blogService.createAction(commentToAdd).subscribe(data => {
      this.comments = data.actions.filter(l => l.actionType === 2);
      $('#commentArea').val('');
    });
  }

  edit(element){
    this.readyToSave = false;
    this.commentToShow = $(element).attr('id');
  }

  guardar(element){
    this.readyToSave = true;
    this.commentToShow = $(element).attr('id');
    const commenToSave = $('#input-comment-' + this.commentToShow );
    let actionToSave = new Action();
    actionToSave.id = this.commentToShow;
    actionToSave.actionType = 2;
    actionToSave.comment = commenToSave.val();
    this.blogService.updateAction(actionToSave).subscribe(data => {
      this.blogService.getActions(this.id).subscribe(response => {
        this.comments = response.filter(a => a.actionType === 2);
      })
    });
  }
}
