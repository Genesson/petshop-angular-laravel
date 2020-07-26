import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-auth-button',
    templateUrl: './auth-button.component.html',
    styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit {

    @Input() isLoading = false;

    @Output() clickConfirm = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
