import { DBManagerInterface } from './interfaces/DBManagerInterface';
import * as Rx from 'rxjs';
import { injectable, inject } from "inversify";

@injectable()
export class DBManager implements DBManagerInterface {

    constructor(
        @inject("SQLLite") protected db: any,
    ) {}

    executeSql(sql: string, params: any[] = []): Rx.Observable<any> {
        return Rx.Observable.create((observer: Rx.Observer<any>) => {
            this.db.transaction(
                (tx: any) => {
                    tx.executeSql(
                        sql, params,
                        (_, { rows: { _array } }) => {
                            observer.next(_array);
                        }
                    );
                },
                (e: any) => observer.error(e),
                () => observer.complete()
            );
        });
    }
}