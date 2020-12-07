import { Context } from 'src/context';

import { MockLogger as logger } from 'src/tests/helpers';
import { APIType } from 'src/api';
import { MessageHighlight, MessageHighlightType } from '../types';


const MOCK_MESSAGE_HIGHLIGHT_URL: MessageHighlight = {
  id: 1,
  text: 'magnet:?xt=urn:tree:tiger:S7WYZE2NGBFNTZQ4J65ZOTSIQJ2GLPJJRVC3IZQ&xl=4215028&dn=mock+magnet+file.log',
  type: MessageHighlightType.LINK_URL,
};

const MOCK_MESSAGE_HIGHLIGHT_TEXT: MessageHighlight = {
  id: 2,
  text: 'Mock.Highlight.Text-TEST',
  type: MessageHighlightType.LINK_TEXT,
};

export const getMockApi = (customHandlers: Partial<APIType> = {}): APIType => {
  const api = {
    ...customHandlers,
    postEvent: () => {
      return Promise.resolve();
    },
    getBundle: () => {
      return Promise.resolve({
        id: 1,
        target: 'C:\\Downloads\\Mock.Bundle.Directory-TEST\\',
      });
    },
    getFilelistItem: () => {
      return Promise.resolve({
        id: 1,
        path: '/filelist-root/Mock.Filelist.Directory-TEST/DISK1/',
      });
    },
    getGroupedSearchResult: () => {
      return Promise.resolve({
        id: 'mock-result-id',
        path: '/filelist-root/Mock.Result.Directory-TEST/Sample/mock-sample.file',
      });
    },
    getHubMessageHighlights: () => {
      return Promise.resolve(MOCK_MESSAGE_HIGHLIGHT_URL);
    },
    getPrivateChatMessageHighlights: () => {
      return Promise.resolve(MOCK_MESSAGE_HIGHLIGHT_TEXT);
    },
  } as Partial<APIType>;

  return api as APIType;
};

export interface MockContextOptions {
  api?: Partial<APIType>,
}

export const getMockContext = (options: Partial<MockContextOptions> = {}) => {
  const context: Context = {
    api: getMockApi(options.api),
    logger, 
  };

  return context;
};