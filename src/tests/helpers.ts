import { ItemInfoGetter } from 'src/types';


import {
  getMenuItems,
} from 'src/search-items';

import { getMockContext } from './mock-context';
import { ContextMenuItem } from 'airdcpp-apisocket';


export const MockLogger = {
  verbose: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

export const itemUrlParser = <IdT extends any, EntityIdT extends any>(
  ids: IdT[],
  entityId: EntityIdT
) => {
  const parseUrls = (item: ContextMenuItem<IdT, EntityIdT>) => {
    const { urls } = item;
    if (Array.isArray(urls)) {
      return urls;
    }

    return urls!(ids, entityId, ['admin'], ['urls']);
  };

  return parseUrls;
};

export const getUrls = async <IdT, EntityIdT>(
  infoGetter: ItemInfoGetter<IdT, EntityIdT>,
  itemParser: ReturnType<typeof itemUrlParser>
) => {
  const context = getMockContext();
  const items = getMenuItems(context, infoGetter);

  const urls = await Promise.all(items.map(itemParser));
  return urls;
};
