import {BehaviorModel} from '../../../shared/models/behavior.model';

export class OpenBehaviorModal {
    static readonly type = '[Behaviors] Open Behavior Modal';

    constructor(public payload: { editing: boolean, data?: BehaviorModel }) {
    }
}

export class CloseBehaviorModal {
    static readonly type = '[Behaviors] Close Behavior Modal';
}

