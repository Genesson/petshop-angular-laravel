import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-package-date',
    templateUrl: './package-date.page.html',
    styleUrls: ['./package-date.page.scss'],
})
export class PackageDatePage implements OnInit {

    @Input() intervals;

    constructor() {
    }

    ngOnInit() {
    }

    public setDate(date) {
        return new Date(date);
    }

    public changeDate(event, i) {
    }

}
