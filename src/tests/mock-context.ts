import { Context } from 'src/types/context';

import { MockLogger as logger } from 'src/tests/helpers';
import { APIType } from 'src/api';
import { MessageHighlight, MessageHighlightType, SearchItem } from '../types';


const MOCK_MESSAGE_HIGHLIGHT_URL: MessageHighlight = {
  id: 1,
  text: 'magnet:?xt=urn:tree:tiger:S7WYZE2NGBFNTZQ4J65ZOTSIQJ2GLPJJRVC3IZQ&xl=4215028&dn=mock+magnet+file.log',
  type: MessageHighlightType.LINK_URL,
};

const MOCK_MESSAGE_HIGHLIGHT_TEXT: MessageHighlight = {
  id: 2,
  text: 'Mock.Highlight.Text.Internal-TEST',
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
        target: 'C:\\Downloads\\2001.Mock.Bundle.Directory.1999-TEST\\',
        type: {
          id: 'directory',
        }
      });
    },
    getFilelistItem: () => {
      return Promise.resolve({
        id: 1,
        path: '/filelist-root/Mock.Filelist.Directory.s02e04-TEST/DISK1/',
        type: {
          id: 'directory',
        }
      });
    },
    getGroupedSearchResult: () => {
      return Promise.resolve({
        id: 'mock-result-id',
        path: '/filelist-root/Mock.Result.Directory.2000.Internal-TEST/Sample/mock-sample.file',
        type: {
          id: 'file',
        }
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



export const MockSearchItems: SearchItem[] = [
  {
    name: 'mock item 1',
    url: 'http://mock-url1/',
    clean: false,
  }, {
    name: 'mock item 2',
    url: 'http://mock-url2/',
    clean: true,
  }
];

export interface MockContextOptions {
  api?: Partial<APIType>,
}

export const getMockContext = (options: Partial<MockContextOptions> = {}) => {
  const context: Context = {
    api: getMockApi(options.api),
    logger,
    sessionInfo: {
      system_info: {
        path_separator: '\\', // Force to Windows separator to make it different from the ADC path separator
      }
    },
    getSearchItems: () => MockSearchItems,
  };

  return context;
};