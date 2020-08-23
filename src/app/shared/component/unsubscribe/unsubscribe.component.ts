import {OnDestroy} from '@angular/core';
import {ReplaySubject} from 'rxjs';

export abstract class UnsubscribeAbstract implements OnDestroy {
  protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
