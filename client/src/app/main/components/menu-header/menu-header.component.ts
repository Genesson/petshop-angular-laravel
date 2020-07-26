import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {UnityModel} from '../../../shared/models/unity.model';
import {UserModel} from '../../../shared/models/user.model';

@Component({
    selector: 'app-menu-header',
    templateUrl: './menu-header.component.html',
    styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

    @Input() user: UserModel;

    @Input() units: UnityModel[];

    @Output() unitySelect = new EventEmitter();

    public formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            unity: [null]
        });
    }

    ngOnInit() {
        if (this.user) {
            this.formGroup.get('unity').patchValue(this.user.unityFull);
        }
    }

    public selectUnity($event) {
        this.unitySelect.emit($event.detail.value);
    }

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    fullScreen() {
        const elem = document.documentElement;
        const methodToBeInvoked = elem.requestFullscreen;
        if (methodToBeInvoked) { methodToBeInvoked.call(elem); }
    }

}
