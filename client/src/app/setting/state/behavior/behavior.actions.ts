import {BehaviorModel} from '../../../shared/models/behavior.model';

export class SelectBehavior {
    static readonly type = '[Behaviors] Select Behavior Success';

    constructor(public payload: BehaviorModel) {
    }
}

export class LoadBehaviors {
    static readonly type = '[Behaviors] Load Behaviors';
}

export class LoadBehaviorsSuccess {
    static readonly type = '[Behaviors] Load Behaviors Success';

    constructor(public payload: BehaviorModel[]) {
    }
}

export class LoadBehaviorsFail {
    static readonly type = '[Behaviors] Load Behaviors Fail';

    constructor(public payload: string) {
    }
}

export class CreateBehavior {
    static readonly type = '[Behaviors] Create Behavior';

    constructor(public payload: BehaviorModel) {
    }
}

export class CreateBehaviorSuccess {
    static readonly type = '[Behaviors] Create Behavior Success';

    constructor(public payload: BehaviorModel) {
    }
}

export class CreateBehaviorFail {
    static readonly type = '[Behaviors] Create Behavior Fail';

    constructor(public payload: any) {
    }
}

export class UpdateBehavior {
    static readonly type = '[Behaviors] Update Behavior';

    constructor(public payload: BehaviorModel) {
    }
}

export class UpdateBehaviorSuccess {
    static readonly type = '[Behaviors] Update Behavior Success';

    constructor(public payload: BehaviorModel) {
    }
}

export class UpdateBehaviorFail {
    static readonly type = '[Behaviors] Update Behavior Fail';

    constructor(public payload: any) {
    }
}

export class DeleteBehavior {
    static readonly type = '[Behaviors] Delete Behavior';

    constructor(public payload: BehaviorModel) {
    }
}

export class DeleteBehaviorSuccess {
    static readonly type = '[Behaviors] Delete Behavior Success';

    constructor(public payload: BehaviorModel) {
    }
}

export class DeleteBehaviorFail {
    static readonly type = '[Behaviors] Delete Behavior Fail';

    constructor(public payload: any) {
    }
}
