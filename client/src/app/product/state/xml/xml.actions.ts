import {XmlModel} from '../../../shared/models/xml.model';

export class SelectXml {
    static readonly type = '[Xmls] Select Xml Success';

    constructor(public payload: XmlModel) {
    }
}

export class ResetXml {
    static readonly type = '[Xmls] Reset Xml';
}

export class LoadXml {
    static readonly type = '[Xmls] Load Xml';

    constructor(public payload: string) {
    }
}

export class LoadXmlSuccess {
    static readonly type = '[Xmls] Load Xml Success';

    constructor(public payload: XmlModel) {
    }
}

export class LoadXmlFail {
    static readonly type = '[Xmls] Load Xml Fail';

    constructor(public payload: any) {
    }
}

export class UploadXml {
    static readonly type = '[Xmls] Upload Xml';

    constructor(public payload: FormData) {
    }
}

export class UploadXmlSuccess {
    static readonly type = '[Xmls] Upload Xml Success';

    constructor(public payload: string) {
    }
}

export class UploadXmlFail {
    static readonly type = '[Xmls] Upload Xml Fail';

    constructor(public payload: any) {
    }
}

export class CreateXml {
    static readonly type = '[Xmls] Create Xml';

    constructor(public payload: XmlModel) {
    }
}

export class CreateXmlSuccess {
    static readonly type = '[Xmls] Create Xml Success';

    constructor(public payload: XmlModel) {
    }
}

export class CreateXmlFail {
    static readonly type = '[Xmls] Create Xml Fail';

    constructor(public payload: any) {
    }
}
