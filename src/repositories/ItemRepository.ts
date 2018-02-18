import { ItemInterface } from './../interfaces/ItemInterface';
import { DBManagerInterface } from './../interfaces/DBManagerInterface';
import { DBRepository } from './../DBRepository';
import { injectable, inject } from "inversify";
import { TYPES } from '../interfaces';

@injectable()
export class ItemRepository extends DBRepository<ItemInterface> {
    constructor(@inject(TYPES.DBManager) protected manager: DBManagerInterface) {
        super(manager, 'items', 'name text')
    }
}