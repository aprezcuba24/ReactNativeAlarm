import * as Rx from 'rxjs';

export interface DBRepositoryInterface {
    remove(id: number): Rx.Observable<boolean>;
    create(entity: any): Rx.Observable<boolean>;
    update(id: number, entity: any): Rx.Observable<boolean>;
    list(): Rx.Observable<any[]>;
}