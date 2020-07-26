import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectXml,
    ResetXml,
    LoadXml,
    LoadXmlSuccess,
    LoadXmlFail,
    UploadXml,
    UploadXmlSuccess,
    UploadXmlFail,
    CreateXml,
    CreateXmlSuccess,
    CreateXmlFail
} from './xml.actions';
import {LoadProducts} from '../product/product.actions';
import {CloseImportModal} from '../import-modal/import-modal.actions';

import {XmlModel} from '../../../shared/models/xml.model';

import {XmlResource} from '../../../shared/resources/xml.resource';

export class XmlStateModel extends NgxsEntityStateStateModel<XmlModel> {
    xml: string;
    isLoading: boolean;
}

@State<XmlStateModel>({
    name: 'xml',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        xml: null,
        isLoading: false
    }
})
@Injectable()
export class XmlState {

    @Selector()
    static selected(state: XmlStateModel) {
        return state.selected;
    }

    @Selector()
    static isLoading(state: XmlStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: XmlStateModel) {
        return state.entities;
    }

    @Selector()
    static xml(state: XmlStateModel) {
        return state.xml;
    }

    constructor(private xmlResource: XmlResource,
                private toastController: ToastController) {
    }

    @Action(SelectXml)
    selectXml(ctx: StateContext<XmlStateModel>, {payload}: SelectXml) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(ResetXml)
    resetXml(ctx: StateContext<XmlStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        NgxsEntityStateAdapter.select(null, ctx);
        setTimeout(() => {
            this.presentToast('Arquivo foi descartado com sucesso!');
            ctx.dispatch(new CloseImportModal());
            NgxsEntityStateAdapter.stopLoading(ctx);
        }, 500);
    }

    @Action(LoadXml)
    loadXmls(ctx: StateContext<XmlStateModel>, {payload}: LoadXml) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.xmlResource.find(payload).pipe(
            map((Xml: XmlModel) => ctx.dispatch(new LoadXmlSuccess(Xml))),
            catchError((error) => ctx.dispatch(new LoadXmlFail(error)))
        );
    }

    @Action(LoadXmlSuccess)
    loadXmlSuccess(ctx: StateContext<XmlStateModel>, {payload}: LoadXmlSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadXmlFail)
    loadXmlFail(ctx: StateContext<XmlStateModel>, {payload}: LoadXmlFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UploadXml)
    uploadXml(ctx: StateContext<XmlStateModel>, action: UploadXml) {
        ctx.patchState({isLoading: true});
        return this.xmlResource.uploadXml(action.payload).pipe(
            map((xml: any) => ctx.dispatch(new UploadXmlSuccess(xml))),
            catchError((error) => ctx.dispatch(new UploadXmlFail(error)))
        );
    }

    @Action(UploadXmlSuccess)
    uploadXmlSuccess(ctx: StateContext<XmlStateModel>, {payload}: UploadXmlSuccess) {
        ctx.dispatch(new LoadXml(payload));
        ctx.patchState({xml: payload});
        ctx.patchState({isLoading: false});
    }

    @Action(UploadXmlFail)
    uploadXmlFail(ctx: StateContext<XmlStateModel>, {payload}: UploadXmlFail) {
        this.presentToast(payload.error.message, 'danger');
        ctx.patchState({isLoading: false});
    }

    @Action(CreateXml)
    createProduct(ctx: StateContext<XmlStateModel>, action: CreateXml) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.xmlResource.create(action.payload).pipe(
            map((Xml: XmlModel) => ctx.dispatch(new CreateXmlSuccess(Xml))),
            catchError((error) => ctx.dispatch(new CreateXmlFail(error)))
        );
    }

    @Action(CreateXmlSuccess)
    createProductSuccess(ctx: StateContext<XmlStateModel>, {payload}: CreateXmlSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        ctx.dispatch(new LoadProducts());
        ctx.dispatch(new CloseImportModal());
        this.presentToast('Produtos importados com sucesso!');
    }

    @Action(CreateXmlFail)
    createProductFail(ctx: StateContext<XmlStateModel>, {payload}: CreateXmlFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    async presentToast(msg, type: string = 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: type
        });
        toast.present();
    }
}
