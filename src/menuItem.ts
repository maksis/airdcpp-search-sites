import { APISocket, ContextMenuItem } from 'airdcpp-apisocket';
import { ItemInfoGetter, SearchItem } from './types';
import { cleanTitle, getReleaseDir } from './utils';


const sendEventMessage = async (socket: APISocket, text: string) => {
  try {
    await socket.post('events', {
      text,
      severity: 'notify',
    });
  } catch (e) {
    console.error(`Failed to send event message: ${e.message}`);
  }
};

const toItemUrl = (item: SearchItem, searchTerm: string, separator: string) => {
  const { url, clean } = item;
  
  let query = getReleaseDir(searchTerm, separator);
  if (clean) {
    query = cleanTitle(query);
  }

  return `${url}${encodeURIComponent(query)}`;
};

export const getMenuItems = <IdT, EntityIdT>(
  socket: APISocket,
  items: SearchItem[], 
  searchTermsGetter: ItemInfoGetter<IdT, EntityIdT>,
  separator: string = '/'
): ContextMenuItem<IdT, EntityIdT>[] => {
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
          searchTerms = await searchTermsGetter(socket, selectedIds, entityId);
        } catch (e) {
          sendEventMessage(socket, `Failed to get item entities: ${e.message}`);
          return undefined;
        }

        return searchTerms.map(searchTerm => toItemUrl(item, searchTerm, separator));
      },
    };

    return ret;
  });
};