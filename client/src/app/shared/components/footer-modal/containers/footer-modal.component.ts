import {Component, Output, OnInit, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'app-footer-modal',
    templateUrl: './footer-modal.component.html',
    styleUrls: ['./footer-modal.component.scss'],
})
export class FooterModalComponent implements OnInit {

    @Input() labelCancel = 'Cancelar';

    @Input() labelConfirm = 'Confirmar';

    @Input() isLoading = false;

    @Output() clickCancel = new EventEmitter();

    @Output() clickConfirm = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
