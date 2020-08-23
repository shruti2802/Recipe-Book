import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-snackbar',
  template: `<div id="snackbar">{{message}}</div>`,
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit{
  @Input() message: string;
  @Output() closed = new Subject();
  constructor() {}
  ngOnInit(): void {
    const x = document.getElementById('snackbar');
    x.className = 'show';
    setTimeout(() => {
      x.className = x.className.replace('show', '');
      this.closed.next();
    }, 3000);
  }
}
