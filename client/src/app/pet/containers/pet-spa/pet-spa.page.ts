import {Component, Input, OnInit} from '@angular/core';

import {PetSandbox} from '../../pet.sandbox';

import {PetModel} from '../../../shared/models/pet.model';
import {CategoryModel} from '../../../shared/models/category.model';
import {SettingSandbox} from '../../../setting/setting.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

@Component({
    selector: 'app-pet-spa',
    templateUrl: './pet-spa.page.html',
    styleUrls: ['./pet-spa.page.scss'],
})
export class PetSpaPage implements OnInit {

    @Input() pet: PetModel;

    @Input() category: CategoryModel;

    public serviceShower = this.settingSandbox.serviceShower;

    constructor(private petSandbox: PetSandbox,
                private settingSandbox: SettingSandbox,
                private unitySandbox: UnitySandbox) {
    }

    ngOnInit() {
    }

    modalService(service) {
        this.unitySandbox.expectedTimeService(service.id, this.pet.size.id);
        this.petSandbox.openPetScheduleModal(service, this.pet);
    }

}
