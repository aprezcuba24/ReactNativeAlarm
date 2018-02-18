export * from './DBManagerInterface';
export * from './DBRepositoryInterface';
export * from './ItemInterface';

const TYPES = {
    DBRepository: Symbol.for("DBRepository"),
    DBManager: Symbol.for("DBManager")
};

export { TYPES };