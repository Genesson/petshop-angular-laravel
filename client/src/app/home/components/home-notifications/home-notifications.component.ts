import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PetVaccineModel} from '../../../shared/models/pet-vaccine.model';

@Component({
    selector: 'app-home-notifications',
    templateUrl: './home-notifications.component.html',
    styleUrls: ['./home-notifications.component.scss'],
})
export class HomeNotificationsComponent implements OnInit {

    @Input() notifications: PetVaccineModel[];

    @Output() openPetProfile = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
