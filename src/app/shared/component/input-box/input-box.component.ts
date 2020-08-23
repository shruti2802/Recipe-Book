import {Component, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {

  constructor() { }

  filterControl = new FormControl(null);

  @Output() filterChanged = new Subject<string>();

  opened = false;

  ngOnInit() {
    this.filterControl.valueChanges.subscribe(value => {
      this.filterChanged.next(value);
    });
  }

  open() {
    this.opened = !this.opened;
    if (this.opened) {
      setTimeout(() => {
        document.getElementById('custom-input').focus();
      });
    }
  }
}
