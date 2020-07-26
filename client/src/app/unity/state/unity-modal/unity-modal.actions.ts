import {UnityModel} from '../../../shared/models/unity.model';

export class OpenUnityModal {
    static readonly type = '[Units] Open Unity Modal';

    constructor(public payload: { editing: boolean, data?: UnityModel }) {
    }
}

export class CloseUnityModal {
    static readonly type = '[Units] Close Unity Modal';
}

