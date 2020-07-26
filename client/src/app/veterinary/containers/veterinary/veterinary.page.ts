import {Component, OnInit, ViewChild} from '@angular/core';

import {Subscription} from 'rxjs';

import {DatatableComponent} from '@swimlane/ngx-datatable';

import {VeterinarySandbox} from '../../veterinary.sandbox';

import {ConsultationModel} from '../../../shared/models/consultation.model';

@Component({
    selector: 'app-veterinary',
    templateUrl: './veterinary.page.html',
    styleUrls: ['./veterinary.page.scss'],
})
export class VeterinaryPage implements OnInit {

    public consultationsCollection$ = this.veterinarySandbox.consultationsCollection$;

    @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    private subscriptions = new Subscription();

    temp = [];

    rows = [];

    constructor(private veterinarySandbox: VeterinarySandbox) {
    }

    ngOnInit() {
        this.veterinarySandbox.loadConsultations();
        this.loadConsultations();
    }

    loadConsultations() {
        this.subscriptions.add(
            this.consultationsCollection$.subscribe(data => {
                this.temp = [...data];
                this.rows = data;
            })
        );
    }

    updateFilterPetName(event) {
        this.loadConsultations();
        const val = event.toLowerCase();
        const temp = this.temp.filter((d: ConsultationModel) => {
            return (d.pet.name.toLowerCase().indexOf(val) !== -1 ||
                d.pet.user.name.toLowerCase().indexOf(val) !== -1 ||
                d.pet.vet_name.toLowerCase().indexOf(val) !== -1) || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    openModalVeterinaryPet() {
        this.veterinarySandbox.openModalVeterinaryPet();
    }

    openModalVeterinaryView(consultation) {
        this.veterinarySandbox.openModalVeterinaryView(consultation);
    }
}
