import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  template: ``
})
export class InvalidRouteComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
