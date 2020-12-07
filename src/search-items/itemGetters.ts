import { parseMagnetLink } from './magnet';
import { FileItemType, ItemInfoGetter, MessageHighlight, MessageHighlightType } from '../types';
import { ADC_PATH_SEPARATOR, getDirectoryPathName, getFilePath } from './utils';


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

// Parse the last meaningful directory name from the path
const parseDirectoryName = (path: string, type: FileItemType, separator = ADC_PATH_SEPARATOR) => {
  const directoryPath = type.id === 'directory' ? path : getFilePath(path);
  const query = getDirectoryPathName(directoryPath, separator);
  return query;
};

export const HubMessageHighlightItemGetter: ItemInfoGetter<number, number> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getHubMessageHighlights(id, entityId)));
  return results.map(parseHighlightText);
};

export const PrivateChatMessageHighlightItemGetter: ItemInfoGetter<number, string> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getPrivateChatMessageHighlights(id, entityId)));
  return results.map(parseHighlightText);
};

export const QueueBundleItemGetter: ItemInfoGetter<number, string> = async ({ api, sessionInfo }, selectedIds) => {
  const results = await Promise.all(selectedIds.map(id => api.getBundle(id)));
  return results.map(result => parseDirectoryName(result.target, result.type, sessionInfo.system_info.path_separator));
};

export const FilelistItemGetter: ItemInfoGetter<number, string> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getFilelistItem(id, entityId)));
  return results.map(result => parseDirectoryName(result.path, result.type, ADC_PATH_SEPARATOR));
};

export const SearchItemGetter: ItemInfoGetter<string, number> = async ({ api }, selectedIds, entityId) => {
  const results = await Promise.all(selectedIds.map(id => api.getGroupedSearchResult(id, entityId)));
  return results.map(result => parseDirectoryName(result.path, result.type, ADC_PATH_SEPARATOR));
};
