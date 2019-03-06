import { Post } from './../models/post';
import { TypeaheadComponent } from './../shared/typeahead/typeahead.component';
import { BlogService } from './../services/blog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  submmited = false;

  @ViewChild(TypeaheadComponent) autoComplete;

  private image;

  ngOnInit() {
    $('#create').click(function(){
      $('#create-post').modal('toggle');
    });
    this.initializeForm();
  }

  guardar(){
    this.submmited = true;
    if (this.postForm.invalid) {
      return;
    }
    let seletedPref = this.autoComplete.getPrefrencesSelected();
    this.post = new Post();

    this.post.owner = this.getUser();
    this.post.imageSrc = this.image;
    this.post.postText = this.postForm.value.postText;
    this.post.postTitle = this.postForm.value.postTitle;
    this.post.preferences = seletedPref;

    this.blogService.createPost(this.post).subscribe(data =>{
      $('#create-post').modal('hide');
      this.blogService.isSaved.next(true);
      this.postForm.reset();
      this.submmited = false;
    });
  }

  get postTitle() { return this.postForm.get('postTitle'); }

  get postText() { return this.postForm.get('postText'); }

  private getUser(){
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  private initializeForm() {
    this.postForm = this.formBuilder.group({
      postTitle: new FormControl('', [Validators.required]),
      postText: new FormControl('', [Validators.required])
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
