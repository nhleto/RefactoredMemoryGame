import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class Destroyable implements OnDestroy{
  protected destroy$ = new ReplaySubject<boolean>(1);

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
