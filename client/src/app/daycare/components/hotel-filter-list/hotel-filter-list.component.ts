import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ServiceModel} from '../../../shared/models/service.model';
import {UserModel} from '../../../shared/models/user.model';

@Component({
    selector: 'app-hotel-filter-list',
    templateUrl: './hotel-filter-list.component.html',
    styleUrls: ['./hotel-filter-list.component.scss'],
})
export class HotelFilterListComponent implements OnInit {

    @Input() currentDate: Date;

    @Input() service: ServiceModel;

    @Input() services: ServiceModel[];

    @Input() users: UserModel[];

    @Output() filterPetName = new EventEmitter();

    @Output() filterService = new EventEmitter();

    @Output() filterDate = new EventEmitter();

    @Output() filterResponsible = new EventEmitter();

    @Output() filterAll = new EventEmitter();

    public formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            pet: [null],
            service: [null],
            date: [null],
            responsible: [null]
        });
    }

    ngOnInit() {
        if (this.service) {
            this.formGroup.get('service').patchValue(this.service.description);
            setTimeout(() => {
                this.filterService.emit(this.service.description);
            }, 1000);
        }
    }

    onClickfilter() {
        this.filterAll.emit(this.formGroup.value);
    }

}
