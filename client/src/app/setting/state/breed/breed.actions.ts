import {BreedModel} from '../../../shared/models/breed.model';

export class SelectBreed {
    static readonly type = '[Breeds] Select Breed Success';

    constructor(public payload: BreedModel) {
    }
}

export class LoadBreeds {
    static readonly type = '[Breeds] Load Breeds';
}

export class LoadBreedsSuccess {
    static readonly type = '[Breeds] Load Breeds Success';

    constructor(public payload: BreedModel[]) {
    }
}

export class LoadBreedsFail {
    static readonly type = '[Breeds] Load Breeds Fail';

    constructor(public payload: any) {
    }
}

export class LoadBreedsPerType {
    static readonly type = '[Breeds] Load Breeds Per Type';

    constructor(public payload: number) {
    }
}

export class LoadBreedsPerTypeSuccess {
    static readonly type = '[Breeds] Load Breeds Per Type Success';

    constructor(public payload: BreedModel[]) {
    }
}

export class LoadBreedsPerTypeFail {
    static readonly type = '[Breeds] Load Breeds Per Type Fail';

    constructor(public payload: any) {
    }
}

export class CreateBreed {
    static readonly type = '[Breeds] Create Breed';

    constructor(public payload: BreedModel) {
    }
}

export class CreateBreedSuccess {
    static readonly type = '[Breeds] Create Breed Success';

    constructor(public payload: BreedModel) {
    }
}

export class CreateBreedFail {
    static readonly type = '[Breeds] Create Breed Fail';

    constructor(public payload: any) {
    }
}

export class UpdateBreed {
    static readonly type = '[Breeds] Update Breed';

    constructor(public payload: BreedModel) {
    }
}

export class UpdateBreedSuccess {
    static readonly type = '[Breeds] Update Breed Success';

    constructor(public payload: BreedModel) {
    }
}

export class UpdateBreedFail {
    static readonly type = '[Breeds] Update Breed Fail';

    constructor(public payload: any) {
    }
}

export class DeleteBreed {
    static readonly type = '[Breeds] Delete Breed';

    constructor(public payload: BreedModel) {
    }
}

export class DeleteBreedSuccess {
    static readonly type = '[Breeds] Delete Breed Success';

    constructor(public payload: BreedModel) {
    }
}

export class DeleteBreedFail {
    static readonly type = '[Breeds] Delete Breed Fail';

    constructor(public payload: any) {
    }
}
