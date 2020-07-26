export class NgxsEntityStateStateModel<T> {
  public ids: string[];
  public entities: { [id: string]: T };
  public selected: T | null;

  static InitialState( defaultState: any = {}) {
    return Object.assign( defaultState, {
        ids: [],
        entities: {},
        selected: null
    });
  }
}
