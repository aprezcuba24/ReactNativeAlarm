import { DBManager } from './DBManager';
import { DBManagerInterface } from './interfaces/DBManagerInterface';
import { DBRepositoryInterface } from './interfaces/DBRepositoryInterface';
import * as Rx from 'rxjs';
import { injectable, inject } from "inversify";
import { TYPES } from './interfaces';

@injectable()
export abstract class DBRepository<T> implements DBRepositoryInterface {

    constructor(
        @inject(TYPES.DBManager) protected manager: DBManagerInterface,
        protected table: string, fields: string
    ) {
        this.manager.executeSql('create table if not exists ' + table + ' (id integer primary key not null, ' + fields + ');').subscribe();
    }

    remove(id: number): Rx.Observable<boolean> {
        return this.manager.executeSql('delete from ' + this.table + ' where id = ?;', [id]);
    }

    create(entity: T): Rx.Observable<boolean> {
        const { fields, values } = this.doParams(entity);
        return this.manager.executeSql('insert into ' + this.table + ' (' + fields.join(',') + ') values (' + values.map(() => '?').join(',') + ');', values);
    }

    update(id: number, entity: T): Rx.Observable<boolean> {
        let { fields, values } = this.doParams(entity);
        fields = fields.map(item => item + ' = ?');
        return this.manager.executeSql('UPDATE ' + this.table + ' SET ' + fields.join(',') + ' WHERE id = ?', id);
    }

    list(): Rx.Observable<T[]> {
        return this.manager.executeSql('select * from ' + this.table + ';');
    }

    protected doParams(entity: T) {
        let fields: string[] = [];
        let values: any[] = [];
        for (let key in entity) {
            fields.push(key);
            values.push(entity[key]);
        }
        return {
            fields,
            values
        }
    }
}