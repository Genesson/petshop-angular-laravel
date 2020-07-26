import {Component, Input, OnInit} from '@angular/core';

import {PetSandbox} from '../../pet.sandbox';

import {PetModel} from '../../../shared/models/pet.model';
import {CategoryModel} from '../../../shared/models/category.model';
import {SettingSandbox} from '../../../setting/setting.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';

@Component({
  selector: 'app-pet-others',
  templateUrl: './pet-others.page.html',
  styleUrls: ['./pet-others.page.scss'],
})
export class PetOthersPage implements OnInit {

    @Input() pet: PetModel;

    @Input() category: CategoryModel;

    public serviceOthers = this.settingSandbox.serviceOthers;

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
