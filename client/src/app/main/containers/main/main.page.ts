import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {NgxPermissionsService} from 'ngx-permissions';

import {UnitySandbox} from '../../../unity/unity.sandbox';
import {UserSandbox} from '../../../user/user.sandbox';
import {AuthSandbox} from '../../../auth/auth.sandbox';
import {SessionSandbox} from '../../../session/session.sandbox';
import {RefreshService} from '../../services/refresh.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    public unitsCollection$ = this.unitySandbox.unitsCollection$;

    public userData$ = this.sessionSandbox.userData$;

    public isLoadingUnity$ = this.userSandbox.isLoadingUnity$;

    public loadingSignin$ = this.authSandbox.loadingSignin$;

    private locale = 'pt-br';

    constructor(public sessionSandbox: SessionSandbox,
                private unitySandbox: UnitySandbox,
                private userSandbox: UserSandbox,
                private authSandbox: AuthSandbox,
                private localeService: BsLocaleService,
                private refreshService: RefreshService,
                private permissionsService: NgxPermissionsService) {
        this.localeService.use(this.locale);
        this.userData$.subscribe((value) => {
            document.body.style.setProperty('--ion-color-primary', value.unityFull.color);
            document.body.style.setProperty('--ion-color-primary-contrast', this.getContrast(value.unityFull.color));
        });
    }

    ngOnInit() {
      console.log('this.sessionSandbox.userData.permission', this.sessionSandbox.userData.permission);
        this.permissionsService.loadPermissions(this.sessionSandbox.userData.permission);

        this.unitySandbox.loadUnits();
        this.refreshService.startCountdown();
    }

    public selectUnity($event) {
        this.userSandbox.updateUserUnity($event);
    }

    private getContrast(hexcolor) {
        if (hexcolor.slice(0, 1) === '#') {
            hexcolor = hexcolor.slice(1);
        }

        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);

        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#212529' : '#f4f4f4';
    }

}
