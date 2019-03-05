import { Preferences } from './../../models/preferences';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit, Output } from '@angular/core';
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
     var listSeleted = this.myPreferences.value.multiCustom as Array<string>;

     let result = [];

     listSeleted.forEach(p => {
      let pref =  this.preferences$.find(s => s.name === p);
      if (typeof pref === 'undefined' ) {
          pref = { id: null, name: '' };
          pref.name = p;
        }
      result.push(pref);
        });

     return result;
  }

}
