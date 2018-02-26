import { ItemInterface } from './../interfaces/ItemInterface';
import { DBManagerInterface } from './../interfaces/DBManagerInterface';
import { DBRepository } from './../DBRepository';
import { injectable, inject } from "inversify";
import { TYPES } from '../interfaces';
import * as Rx from 'rxjs';

@injectable()
export class ItemRepository extends DBRepository<ItemInterface> {
    constructor(@inject(TYPES.DBManager) protected manager: DBManagerInterface) {
        super(manager, 'items', {
            name: 'text',
            hour: 'text',
            weekdays: 'text',
            repeat: 'number',
        })
    }

    create(entity: ItemInterface): Rx.Observable<boolean> {
        let newEntity: any = {...entity};
        newEntity.weekdays = JSON.stringify(newEntity.weekdays);
        return super.create(newEntity);
    }
}