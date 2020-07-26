import {Injectable} from '@angular/core';

import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private alert;

    private icon: string;

    private template: string;

    constructor(private alertController: AlertController) {
    }

    public async presentAlert(title: string, message: string, color: string = 'success', duration: number = 1200) {
        this.icon = (color === 'success') ? 'checkmark' : 'close';
        this.template = `<div class="bg-icon">
                            <ion-button class="icon ${color}">
                                <ion-icon name="${this.icon}" size="large"></ion-icon>
                            </ion-button>
                         </div>`;
        this.alert = await this.alertController.create({header: title, message: this.template + message});
        await this.alert.present();

        if (duration) {
            setTimeout(() => {
                this.dismissAlert();
            }, duration);
        }
    }

    private async dismissAlert() {
        await this.alert.dismiss();
    }

}
