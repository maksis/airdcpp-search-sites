import { Context } from './context';

export type ItemInfoGetter<IdT, EntityIdT> = (context: Context, selectedIds: IdT[], entityId: EntityIdT) => Promise<string[]>;
