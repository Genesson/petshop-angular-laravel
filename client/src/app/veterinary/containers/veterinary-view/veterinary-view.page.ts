import {Component, Input, OnInit} from '@angular/core';

import {VeterinarySandbox} from '../../veterinary.sandbox';

import {ConsultationModel} from '../../../shared/models/consultation.model';

@Component({
    selector: 'app-veterinary-view',
    templateUrl: './veterinary-view.page.html',
    styleUrls: ['./veterinary-view.page.scss'],
})
export class VeterinaryViewPage implements OnInit {

    @Input() consultation: ConsultationModel;

    constructor(private veterinarySandbox: VeterinarySandbox) {
    }

    ngOnInit() {
    }

    onClickCancel() {
        this.veterinarySandbox.closeModalVeterinaryView();
    }

    onClickConfirm() {
        this.veterinarySandbox.closeModalVeterinaryView();
    }
}
