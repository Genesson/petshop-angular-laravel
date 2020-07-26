import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-dre-filter',
    templateUrl: './dre-filter.component.html',
    styleUrls: ['./dre-filter.component.scss'],
})
export class DreFilterComponent implements OnInit {

    @Input() currentDate: Date;

    @Output() clickButton = new EventEmitter();

    @Output() backDate = new EventEmitter();

    @Output() forwardDate = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
