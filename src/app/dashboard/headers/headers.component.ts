import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LocalStorageConstant} from '../../shared/enum/local-storage-constant.enum';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeAbstract} from '../../shared/component/unsubscribe/unsubscribe.component';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent extends UnsubscribeAbstract implements OnInit {
  user: string;

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.authService.getCurrentUser();
    this.authService.currentUser.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.user = user.username;
    });
  }

  logout() {
    localStorage.removeItem(LocalStorageConstant.token);
    this.router.navigate(['/auth']);
  }

  reload() {
    window.location.reload();
  }
}
