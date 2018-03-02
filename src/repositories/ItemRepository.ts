import { ItemInterface } from './../interfaces/ItemInterface';
import { DBManagerInterface } from './../interfaces/DBManagerInterface';
import { DBRepository } from './../DBRepository';
import { injectable, inject } from "inversify";
import { TYPES } from '../interfaces';
import * as Rx from 'rxjs';
import {Observable} from "rxjs/Rx";

@injectable()
export class ItemRepository extends DBRepository<ItemInterface> {
    constructor(@inject(TYPES.DBManager) protected manager: DBManagerInterface) {
        super(manager, 'items', {
            name: 'text',
            hour: 'number',
            minutes: 'number',
            weekdays: 'text',
            repeat: 'number',
        })
    }

    protected prepareObject(entity: ItemInterface) {
        entity.weekdays = JSON.stringify(entity.weekdays);
        return entity;
    }

    list(): Rx.Observable<ItemInterface[]> {
        return super.list()
            .flatMap(items => 
                Observable.from(items)
                    .map((item: ItemInterface) => {
                        item.weekdays = JSON.parse(item.weekdays);
                        return item;
                    })
                    .toArray()
            );
    }
}