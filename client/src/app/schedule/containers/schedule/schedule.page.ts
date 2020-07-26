import {Component, OnInit} from '@angular/core';

import {ScheduleSandbox} from '../../schedule.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';
import {SessionSandbox} from '../../../session/session.sandbox';
import {CartSandbox} from '../../../cart/cart.sandbox';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.page.html',
    styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public currentDate = new Date();

  public schedulesCollection$ = this.scheduleSandbox.schedulesCollection$;

  public isLoading$ = this.scheduleSandbox.isLoadingSchedule$;

  public servicesCollection$ = this.unitySandbox.servicesCollection$;

  public userData = this.sessionSandbox.userData;

  public orderSelected$ = this.cartSandbox.orderSelected$;

  constructor(
    private scheduleSandbox: ScheduleSandbox,
    private unitySandbox: UnitySandbox,
    private sessionSandbox: SessionSandbox,
    private cartSandbox: CartSandbox
  ) {}

  ngOnInit() {
    this.scheduleSandbox.loadSchedules();
    this.cartSandbox.loadOrder();
  }

  changeDate($event) {
    this.currentDate = $event;
  }

  backDate() {
    this.currentDate = new Date(
      this.currentDate.setMonth(this.currentDate.getMonth() - 1)
    );
  }

  forwardDate() {
    this.currentDate = new Date(
      this.currentDate.setMonth(this.currentDate.getMonth() + 1)
    );
  }

  openScheduleList() {
    this.scheduleSandbox.openScheduleListModal();
  }

  updateFilter(event) {
    this.scheduleSandbox.loadSchedulesByService(event.detail.value);
  }
}
