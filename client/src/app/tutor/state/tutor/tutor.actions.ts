import {UserModel} from '../../../shared/models/user.model';

export class SelectTutor {
  static readonly type = '[Tutors] Select Tutor Success';

  constructor(public payload: UserModel) {
  }
}

export class LoadTutors {
  static readonly type = '[Tutors] Load Tutors';

  constructor(public payload: number) {
  }
}

export class LoadTutorsSuccess {
  static readonly type = '[Tutors] Load Tutors Success';

  constructor(public payload: {
    data: UserModel[],
    first_page_url: string,
    prev_page_url: string,
    current_page: number,
    next_page_url: string,
    from: number,
    per_page: number,
    to: number
  }) {
  }
}

export class LoadTutorsFail {
  static readonly type = '[Tutors] Load Tutors Fail';

  constructor(public payload: any) {
  }
}

export class LoadNextPageTutor {
  static readonly type = '[Tutors] Load Next Page Tutor';

  constructor(public payload: {skip: number, termo?: string}) {
  }
}

export class CreateTutor {
  static readonly type = '[Tutors] Create Tutor';

  constructor(public payload: UserModel) {
  }
}

export class CreateTutorSuccess {
  static readonly type = '[Tutors] Create Tutor Success';

  constructor(public payload: UserModel) {
  }
}

export class CreateTutorFail {
  static readonly type = '[Tutors] Create Tutor Fail';

  constructor(public payload: any) {
  }
}

export class UpdateTutor {
  static readonly type = '[Tutors] Update Tutor';

  constructor(public payload: UserModel) {
  }
}

export class UpdateTutorSuccess {
  static readonly type = '[Tutors] Update Tutor Success';

  constructor(public payload: UserModel) {
  }
}

export class UpdateTutorFail {
  static readonly type = '[Tutors] Update Tutor Fail';

  constructor(public payload: any) {
  }
}

export class DeleteTutor {
  static readonly type = '[Tutors] Delete Tutor';

  constructor(public payload: UserModel) {
  }
}

export class DeleteTutorSuccess {
  static readonly type = '[Tutors] Delete Tutor Success';

  constructor(public payload: UserModel) {
  }
}

export class DeleteTutorFail {
  static readonly type = '[Tutors] Delete Tutor Fail';

  constructor(public payload: any) {
  }
}

export class UploadImageTutor {
  static readonly type = '[Tutors] Upload Image Tutor';

  constructor(public payload: FormData) {
  }
}

export class UploadImageTutorSuccess {
  static readonly type = '[Tutors] Upload Image Tutor Success';

  constructor(public payload: string) {
  }
}

export class UploadImageTutorFail {
  static readonly type = '[Tutors] Upload Image Tutor Fail';

  constructor(public payload: any) {
  }
}

export class UploadCsvContact {
  static readonly type = '[Contacts] Upload Csv Contact';

  constructor(public payload: FormData) {
  }
}

export class UploadCsvContactSuccess {
  static readonly type = '[Contacts] Upload Csv Contact Success';

  constructor(public payload: any[]) {
  }
}

export class UploadCsvContactFail {
  static readonly type = '[Contacts] Upload Csv Contact Fail';

  constructor(public payload: any) {
  }
}

export class UploadCsvTutor {
  static readonly type = '[Tutors] Upload Csv Tutor';

  constructor(public payload: FormData) {
  }
}

export class UploadCsvTutorSuccess {
  static readonly type = '[Tutors] Upload Csv Tutor Success';

  constructor(public payload: UserModel[]) {
  }
}

export class UploadCsvTutorFail {
  static readonly type = '[Tutors] Upload Csv Tutor Fail';

  constructor(public payload: any) {
  }
}
