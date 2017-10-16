import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class TwoComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.user.name = 'Scott Raynor';
  }

}
