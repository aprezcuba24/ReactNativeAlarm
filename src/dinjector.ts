import { DBManager } from './DBManager';
import { Container, interfaces } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { TYPES as TYPESInterface, DBManagerInterface, DBRepositoryInterface } from "./interfaces";
import { TYPES as TYPESRepository, ItemRepository } from './repositories';
import Expo, { SQLite } from 'expo';

const container = new Container();
const { lazyInject } = getDecorators(container);

container.bind<any>("SQLLite").toConstantValue(SQLite.openDatabase('db.db'));
container.bind<DBManagerInterface>(TYPESInterface.DBManager).to(DBManager);

//Repositories
container.bind<ItemRepository>(TYPESRepository.ItemRepository).toDynamicValue((context: interfaces.Context) => {
    return new ItemRepository(context.container.get(TYPESInterface.DBManager));
});

export { container, lazyInject };