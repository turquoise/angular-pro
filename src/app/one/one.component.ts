import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class OneComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.user.name = 'Matt Skiba';
  }

}
