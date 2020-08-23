import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../shared/component/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends UnsubscribeAbstract {
  visible = false;
  errorMessage = null;

  controls = {
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  };

  loading = false;

  form  = new FormGroup(this.controls);

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    super();
  }


  submit() {
    if (this.form.invalid) {
      return;
    } else {
      this.loading = true;
      this.authService.signUp(this.form.value).pipe(takeUntil(this.destroyed$)).subscribe(value => {
        // @ts-ignore
        this.authService.createSpace(this.form.value.email, this.form.value.username, value.localId);
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute}).then(_ => {this.loading = false;});
      }, error => {
        this.loading = false;
        this.errorMessage = this.authService.handleError(error);
        this.visible = true;
      });
    }
  }

  closed() {
    this.errorMessage = null;
    this.visible = false;
  }

}
