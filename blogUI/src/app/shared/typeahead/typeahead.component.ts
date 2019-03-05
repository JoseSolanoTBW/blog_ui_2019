import { Preferences } from './../../models/preferences';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private blogService : BlogService  ) { }

  myPreferences: FormGroup;
  preferences$: Preferences[];
  strPref: string[];

  ngOnInit() {
    this.fetchData();
    this.initializeForm();
  }

  private fetchData(){
    this.blogService.getAllPreferences().subscribe(data => {
      this.preferences$ = data;
      this.strPref = data.map(c => c.name);
      });
  }

  private initializeForm() {
    this.myPreferences = this.formBuilder.group({
      multiCustom:[]
    });
  }

  getPrefrencesSelected(){
    return this.myPreferences.value;
  }

}
