import { BlogService } from './../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private blogService: BlogService, private router: Router, private route: ActivatedRoute,) { }
  loging: FormGroup;

  ngOnInit() {
    this.initializeForm();
    $('#login').click( function(){
        $('#modal').modal('toggle');
      });
  }

  iniciar(){
    this.blogService.login(this.loging.value.nickName).subscribe(data =>{
      localStorage.setItem('user', JSON.stringify(data));
      this.go();
    });
  }

  private initializeForm() {
    this.loging = this.formBuilder.group({
      nickName: ''
    });
  }

  go() {
    this.router.navigate([`../dashboard`], { relativeTo: this.route });
  }

}
