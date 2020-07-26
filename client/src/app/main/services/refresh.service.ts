import { Injectable } from '@angular/core';

import { AuthSandbox } from '../../auth/auth.sandbox';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  public counter = 1000;

  constructor(private authSandbox: AuthSandbox) { }

  public startCountdown() {
    const interval = setInterval(() => {
      this.counter--;

      if (this.counter < 0) {
        this.counter = 1000;
        clearInterval(interval);
        this.refresh();
      }
    }, 1000);
  }

  private refresh() {
    this.authSandbox.refresh();
    this.startCountdown();
  }
}
