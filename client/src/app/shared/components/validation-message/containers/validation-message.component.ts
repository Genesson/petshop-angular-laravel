import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-validation-message',
    templateUrl: './validation-message.component.html',
    styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent implements OnInit {

    @Input() form: FormGroup;

    @Input() control: string;

    @Input() marginTop = false;

    @Input() validation: { type: string, message: string };

    constructor() {
    }

    ngOnInit() {
    }

}
