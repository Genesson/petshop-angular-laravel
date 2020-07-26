import {Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';

import {ReportSandbox} from '../../report.sandbox';

@Component({
    selector: 'app-report',
    templateUrl: './report.page.html',
    styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
    public dreSelected$ = this.reportSandbox.dreSelected$;

    public currentDate = new Date();

    constructor(private reportSandbox: ReportSandbox, public datepipe: DatePipe) {}

    ngOnInit() {
        this.changeDate();
    }

    changeDate() {
        this.reportSandbox.loadDres(this.datepipe.transform(this.currentDate, 'dd-MM-yyyy'));
    }

    backDate() {
        this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
        this.changeDate();
    }

    forwardDate() {
        this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
        this.changeDate();
    }

    openButton() {
        this.reportSandbox.loadPdf(this.datepipe.transform(this.currentDate, 'dd-MM-yyyy'));
    }

    openModal(event) {
        this.reportSandbox.openModal(true, event);
    }
}
