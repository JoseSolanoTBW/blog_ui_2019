import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})
export class DetailpostComponent implements OnInit {

  id;
  constructor( private route : ActivatedRoute, private location : Location, private formBuilder: FormBuilder ) { }
  comment: FormGroup;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
  }
  private initializeForm() {
    this.comment = this.formBuilder.group({});
  }

}
