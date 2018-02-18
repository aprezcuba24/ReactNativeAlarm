import * as Rx from 'rxjs';

export interface DBManagerInterface {
    executeSql(sql: string, params?: any[] | any): Rx.Observable<any>;
}