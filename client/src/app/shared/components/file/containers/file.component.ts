import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {

    @Input() description: string;

    @Input() image: string;

    @Input() height: '100%';

    @Input() isLoading = false;

    @Output() actionClick = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
