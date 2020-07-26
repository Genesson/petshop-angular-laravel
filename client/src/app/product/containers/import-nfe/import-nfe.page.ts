import {Component, OnInit} from '@angular/core';

import {ProductSandbox} from '../../product.sandbox';

@Component({
    selector: 'app-import-nfe',
    templateUrl: './import-nfe.page.html',
    styleUrls: ['./import-nfe.page.scss'],
})
export class ImportNfePage implements OnInit {

    public xmlSelected$ = this.productSandbox.xmlSelected$;

    public isLoading$ = this.productSandbox.isLoadingXml$;

    constructor(private productSandbox: ProductSandbox) {
    }

    ngOnInit() {
    }

    public onFileUpload(event) {
        const formData = new FormData();
        const file = (event.target as HTMLInputElement).files[0];
        formData.append('xml', file);
        this.productSandbox.uploadXml(formData);
    }

    public onClickCancel() {
        this.productSandbox.resetXml();
    }

    public onClickConfirm(xml) {
        this.productSandbox.createXml(xml);
    }
}
