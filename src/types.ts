import { APISocket } from 'airdcpp-apisocket';

export type ItemInfoGetter<IdT, EntityIdT> = (socket: APISocket, selectedIds: IdT[], entityId: EntityIdT) => Promise<string[]>;

export interface SearchItem {
  name: string;
  url: string;
  clean: boolean;
  icon?: string;
}
