import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-card-pet',
    templateUrl: './card-pet.component.html',
    styleUrls: ['./card-pet.component.scss'],
})
export class CardPetComponent implements OnInit {

    @Input() name: string;

    @Input() image: string;

    @Input() isButtons = false;

    @Input() onlyDelete = false;

    @Output() clickEdit = new EventEmitter();

    @Output() clickDelete = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
