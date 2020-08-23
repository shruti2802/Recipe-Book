import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';
import {SnackbarComponent} from '../../shared/component/snackbar/snackbar.component';
import {LocalStorageConstant} from '../../shared/enum/local-storage-constant.enum';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../shared/component/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SnackbarComponent]
})
export class LoginComponent extends UnsubscribeAbstract implements OnInit {
  visible = false;
  errorMessage = null;

  controls = {
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  };

  form  = new FormGroup(this.controls);

  loading = false;

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: SnackbarComponent) {
    super();
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      return;
    } else {
      this.loading = true;
      this.authService.login(this.form.value).pipe(takeUntil(this.destroyed$)).subscribe(value => {
        // @ts-ignore
        localStorage.setItem(LocalStorageConstant.token, value.localId);
        this.router.navigate(['/dashboard']).then(_ => {
          this.loading = false;
        });
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
