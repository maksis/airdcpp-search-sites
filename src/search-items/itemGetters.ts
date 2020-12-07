import { parseMagnetLink } from './magnet';
import { ItemInfoGetter, MessageHighlight, MessageHighlightType } from '../types';


const parseHighlightText = (highlight: MessageHighlight) => {
  switch (highlight.type) {
    case MessageHighlightType.LINK_TEXT: {
      return highlight.text;
    }
    case MessageHighlightType.LINK_URL: {
      if (highlight.text.startsWith('magnet:?')) {
        const magnet = parseMagnetLink(highlight.text);
        if (magnet && magnet.name) {
          return magnet.name;
        }
      }
    }
  }

  return highlight.text;
};

export const HubMessageHighlightItemGetter: ItemInfoGetter<number, number> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getHubMessageHighlights(id, entityId)));
  return results.map(parseHighlightText);
};

export const PrivateChatMessageHighlightItemGetter: ItemInfoGetter<number, string> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getPrivateChatMessageHighlights(id, entityId)));
  return results.map(parseHighlightText);
};

export const QueueBundleItemGetter: ItemInfoGetter<number, string> = async ({ api }, selectedIds) => {
  const results = await Promise.all(selectedIds.map(id => api.getBundle(id)));
  return results.map(result => result.target);
};

export const FilelistItemGetter: ItemInfoGetter<number, string> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getFilelistItem(id, entityId)));
  return results.map(result => result.path);
};

export const SearchItemGetter: ItemInfoGetter<string, number> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getGroupedSearchResult(id, entityId)));
  return results.map(result => result.path);
};
