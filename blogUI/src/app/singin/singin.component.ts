import { User } from './../models/user';
import { BlogService } from './../services/blog.service';
import { TypeaheadComponent } from './../shared/typeahead/typeahead.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private blogService : BlogService) { }
  singIn: FormGroup;
  private user : User;

  @ViewChild(TypeaheadComponent) autoComplete;

  ngOnInit() {
    this.initializeForm();
    $('#singin').click(function(){
      $('#sing-in').modal('toggle');
    });
  }

  create(){
    let seletedPref = this.autoComplete.getPrefrencesSelected();
    this.user = new User();
    this.user.preferences = seletedPref;
    this.user.nickName = this.singIn.value.nickName;
    this.blogService.createUser(this.user).subscribe(data => {
      localStorage.setItem('user', JSON.stringify(data));
      this.go();
      this.blogService.performSearch.next(0);
    })
  }

  private initializeForm() {
    this.singIn = this.formBuilder.group({
      nickName: ''
    });
  }

  go() {
    this.router.navigate([`../dashboard`], { relativeTo: this.route });
  }

}
