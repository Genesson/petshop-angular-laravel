import {PetModel} from '../../../shared/models/pet.model';
import {UserModel} from '../../../shared/models/user.model';

export class SelectPet {
    static readonly type = '[Pets] Select Pet Success';

    constructor(public payload: PetModel) {
    }
}

export class ResetPets {
    static readonly type = '[Pets] Reset Pets';
}

export class LoadPets {
    static readonly type = '[Pets] Load Pets';
}

export class LoadPetsSuccess {
    static readonly type = '[Pets] Load Pets Success';

    constructor(public payload: PetModel[]) {
    }
}

export class LoadPetsFail {
    static readonly type = '[Pets] Load Pets Fail';

    constructor(public payload: any) {
    }
}

export class LoadPetsTutor {
    static readonly type = '[Pets] Load Pets Tutor';

    constructor(public payload: UserModel) {
    }
}

export class LoadPetsTutorSuccess {
    static readonly type = '[Pets] Load Pets Tutor Success';

    constructor(public payload: PetModel[]) {
    }
}

export class LoadPetsTutorFail {
    static readonly type = '[Pets] Load Pets Tutor Fail';

    constructor(public payload: any) {
    }
}

export class CreatePet {
    static readonly type = '[Pets] Create Pet';

    constructor(public payload: PetModel) {
    }
}

export class CreatePetSuccess {
    static readonly type = '[Pets] Create Pet Success';

    constructor(public payload: PetModel) {
    }
}

export class CreatePetFail {
    static readonly type = '[Pets] Create Pet Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePet {
    static readonly type = '[Pets] Update Pet';

    constructor(public payload: PetModel) {
    }
}

export class UpdatePetSuccess {
    static readonly type = '[Pets] Update Pet Success';

    constructor(public payload: PetModel) {
    }
}

export class UpdatePetFail {
    static readonly type = '[Pets] Update Pet Fail';

    constructor(public payload: any) {
    }
}

export class DeletePet {
    static readonly type = '[Pets] Delete Pet';

    constructor(public payload: PetModel) {
    }
}

export class DeletePetSuccess {
    static readonly type = '[Pets] Delete Pet Success';

    constructor(public payload: PetModel) {
    }
}

export class DeletePetFail {
    static readonly type = '[Pets] Delete Pet Fail';

    constructor(public payload: any) {
    }
}

export class UploadImagePet {
    static readonly type = '[Pets] Upload Image Pet';

    constructor(public payload: FormData) {
    }
}

export class UploadImagePetSuccess {
    static readonly type = '[Pets] Upload Image Pet Success';

    constructor(public payload: string) {
    }
}

export class UploadImagePetFail {
    static readonly type = '[Pets] Upload Image Pet Fail';

    constructor(public payload: any) {
    }
}

export class UploadImageCarterPet {
    static readonly type = '[Pets] Upload Image Carter Pet';

    constructor(public payload: FormData) {
    }
}

export class UploadImageCarterPetSuccess {
    static readonly type = '[Pets] Upload Image Carter Pet Success';

    constructor(public payload: string) {
    }
}

export class UploadImageCarterPetFail {
    static readonly type = '[Pets] Upload Image Carter Pet Fail';

    constructor(public payload: any) {
    }
}

export class UploadCsvPet {
  static readonly type = '[Pets] Upload Csv Pet';

  constructor(public payload: FormData) {
  }
}

export class UploadCsvPetSuccess {
  static readonly type = '[Pets] Upload Csv Pet Success';

  constructor(public payload: any[]) {
  }
}

export class UploadCsvPetFail {
  static readonly type = '[Pets] Upload Csv Pet Fail';

  constructor(public payload: any) {
  }
}
