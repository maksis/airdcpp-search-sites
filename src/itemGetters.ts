import { APISocket } from 'airdcpp-apisocket';
import { parseMagnetLink } from './magnet';
import { ItemInfoGetter } from './types';


const enum MessageHighlightTypeEnum {
  LINK_URL = 'link_url',
  LINK_TEXT = 'link_text',
  USER = 'user',
  BOLD = 'bold',
}

interface MessageHighlight {
  id: number;
  text: string;
  description_id: string;
  position: {
    start: number;
    end: number;
  };
  type: MessageHighlightTypeEnum;
  // dupe: Dupe | null;
  // content_type: FileContentType | null;
}

const parseHighlightText = (highlight: MessageHighlight) => {
  switch (highlight.type) {
    case MessageHighlightTypeEnum.LINK_TEXT: {
      return highlight.text;
    }
    case MessageHighlightTypeEnum.LINK_URL: {
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

export const HubMessageHighlightItemGetter: ItemInfoGetter<number, number> = async (socket: APISocket, selectedIds: number[], entityId: number) => {
  const results = await Promise.all(selectedIds.map(id => socket.get<any>(`hubs/${entityId}/messages/highlights/${id}`)));
  return results.map(parseHighlightText);
};

export const PrivateChatMessageHighlightItemGetter: ItemInfoGetter<number, string> = async (socket: APISocket, selectedIds: number[], entityId: string) => {
  const results = await Promise.all(selectedIds.map(id => socket.get<any>(`private_chat/${entityId}/messages/highlights/${id}`)));
  return results.map(parseHighlightText);
};

export const QueueBundleItemGetter: ItemInfoGetter<number, number> = async (socket: APISocket, selectedIds: number[]) => {
  const results = await Promise.all(selectedIds.map(id => socket.get<any>(`queue/bundles/${id}`)));
  return results.map(result => result.target);
};

export const FilelistItemGetter: ItemInfoGetter<number, number> = async (socket: APISocket, selectedIds: number[], entityId: number) => {
  const results = await Promise.all(selectedIds.map(id => socket.get<any>(`filelists/${entityId}/items/${id}`)));
  return results.map(result => result.path);
};

export const SearchItemGetter: ItemInfoGetter<string, number> = async (socket: APISocket, selectedIds: string[], entityId: number) => {
  const results = await Promise.all(selectedIds.map(id => socket.get<any>(`search/${entityId}/results/${id}`)));
  return results.map(result => result.path);
};
