import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {LocalStorageConstant} from '../shared/enum/local-storage-constant.enum';
import {environment} from '../../environments/environment';
import {takeUntil} from 'rxjs/operators';
import {User} from './auth.service';
import {UnsubscribeAbstract} from '../shared/component/unsubscribe/unsubscribe.component';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService extends UnsubscribeAbstract {
  constructor(private httpClient: HttpClient, private router: Router) {
    super();
    window.addEventListener('storage', (e) => {
      if (e.key === LocalStorageConstant.token) {
        this.httpClient.get(`${environment.baseUrl}/users.json`).pipe(takeUntil(this.destroyed$)).subscribe((res: User[]) => {
          const item = res.find(x => x.id === e.newValue);
          if (!item) {
            this.router.navigate(['/']);
          }
        });
        }
    });
  }
}
