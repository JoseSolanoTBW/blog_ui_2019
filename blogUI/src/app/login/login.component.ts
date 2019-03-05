import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  loging: FormGroup;

  ngOnInit() {
    this.initializeForm();
      $('#login').click(function(){
        $('#modal').modal('toggle');
      });
  }

  iniciar(nickname : string){
    console.log(nickname);
  }
  private initializeForm() {
    this.loging = this.formBuilder.group({});
  }

}
