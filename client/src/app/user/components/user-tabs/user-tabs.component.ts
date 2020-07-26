import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-user-tabs',
    templateUrl: './user-tabs.component.html',
    styleUrls: ['./user-tabs.component.scss'],
})
export class UserTabsComponent implements OnInit {

    @Input() selected: string;

    @Output() tab = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
