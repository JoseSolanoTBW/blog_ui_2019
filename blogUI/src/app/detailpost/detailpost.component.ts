import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.css']
})
export class DetailpostComponent implements OnInit {

  id;
  constructor( private route : ActivatedRoute, private location : Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
  }

}
