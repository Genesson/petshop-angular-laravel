import {Component, Output, OnInit, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'app-footer-button',
    templateUrl: './footer-button.component.html',
    styleUrls: ['./footer-button.component.scss'],
})
export class FooterButtonComponent implements OnInit {

    @Input() labelCancel = 'Cancelar';

    @Input() labelConfirm = 'Confirmar';

    @Input() colorConfirm = 'success';

    @Input() isDisabled = true;

    @Input() isLoading = false;

    @Output() clickCancel = new EventEmitter();

    @Output() clickConfirm = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
