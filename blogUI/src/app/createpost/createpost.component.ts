import { Post } from './../models/post';
import { TypeaheadComponent } from './../shared/typeahead/typeahead.component';
import { BlogService } from './../services/blog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user';

declare var $: any;

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private blogService: BlogService) { }

  postForm: FormGroup;
  private post: Post;

  @ViewChild(TypeaheadComponent) autoComplete;

  private image;

  ngOnInit() {
    $('#create').click(function(){
      $('#create-post').modal('toggle');
    });
    this.initializeForm();
  }

  guardar(){
    let seletedPref = this.autoComplete.getPrefrencesSelected();
    this.post = new Post();

    this.post.owner = this.getUser();
    this.post.imageSrc = this.image;
    this.post.postText = this.postForm.value.postText;
    this.post.postTitle = this.postForm.value.postTitle;
    this.post.preferences = seletedPref;
    this.blogService.createPost(this.post).subscribe(data =>{
      $( '.modal-backdrop' ).remove();
      $('body').removeClass('modal-open');
      this.blogService.isSaved.next(true);
    });
  }

  private getUser(){
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  private initializeForm() {
    this.postForm = this.formBuilder.group({
      postTitle: '',
      postText: ''
    });
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
}
