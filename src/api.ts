import { APISocket } from 'airdcpp-apisocket';

import { Bundle, FilelistItem, GroupedSearchResult, MessageHighlight, SeverityEnum } from './types';


export const API = (socket: APISocket) => {
  const getPrivateChatMessageHighlights = async (highlightId: number, entityId: string) => {
    return socket.get<MessageHighlight>(
      `private_chat/${entityId}/messages/highlights/${highlightId}`
    );
  };

  const getHubMessageHighlights = async (highlightId: number, entityId: number) => {
    return socket.get<MessageHighlight>(
      `hubs/${entityId}/messages/highlights/${highlightId}`
    );
  };

  const getBundle = async (bundleId: number) => {
    return socket.get<Bundle>(
      `queue/bundles/${bundleId}`
    );
  };

  const getFilelistItem = async (filelistItemId: number, entityId: string) => {
    return socket.get<FilelistItem>(
      `filelists/${entityId}/items/${filelistItemId}`
    );
  };

  const getGroupedSearchResult = async (resultId: string, entityId: number) => {
    return socket.get<GroupedSearchResult>(
      `search/${entityId}/results/${resultId}`
    );
  };

  const postEvent = async (text: string, severity: SeverityEnum) => {
    return socket.post(
      'events',
      {
        text,
        severity,
      }
    );
  };

  return {
    getPrivateChatMessageHighlights,
    getHubMessageHighlights,
    getBundle,
    getFilelistItem,
    getGroupedSearchResult,

    postEvent,
  };
};

export type APIType = ReturnType<typeof API>;
