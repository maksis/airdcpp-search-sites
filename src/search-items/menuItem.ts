import { ContextMenuItem } from 'airdcpp-apisocket';
import { Context } from '../context';
import { ItemInfoGetter, SearchItem, SeverityEnum } from '../types';
import { cleanTitle, getDirectoryPathName, getFilePath, isDirectoryPath } from './utils';


const toItemUrl = (item: SearchItem, searchTerm: string, separator: string) => {
  const { url, clean } = item;
  
  const directoryPath = isDirectoryPath(searchTerm) ? searchTerm : getFilePath(searchTerm);
  let query = getDirectoryPathName(directoryPath, separator);
  if (clean) {
    query = cleanTitle(query);
  }

  return `${url}${encodeURIComponent(query)}`;
};

export const getMenuItems = <IdT, EntityIdT>(
  context: Context,
  items: SearchItem[], 
  searchTermsGetter: ItemInfoGetter<IdT, EntityIdT>,
  separator: string = '/'
): ContextMenuItem<IdT, EntityIdT>[] => {
  const { api, logger } = context;
  return items.map(item => {
    const { name, icon } = item;
    const ret: ContextMenuItem<any, any> = {
      id: name,
      title: name,
      icon: {
        semantic: icon || 'external',
      },
      urls: async (selectedIds, entityId) => {
        let searchTerms: string[] = [];

        // We could do some caching so that the search terms won't be fetched for every context menu item separately...
        try {
          searchTerms = await searchTermsGetter(context, selectedIds, entityId);
        } catch (e) {
          logger.error(`Failed to get item entities: ${e.message}`);
          api.postEvent(`Failed to get item entities: ${e.message}`, SeverityEnum.NOTIFY);
          return undefined;
        }

        return searchTerms.map(searchTerm => toItemUrl(item, searchTerm, separator));
      },
    };

    return ret;
  });
};