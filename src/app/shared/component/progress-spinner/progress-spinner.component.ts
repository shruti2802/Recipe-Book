import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  template: '<div class="loader"></div>',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
