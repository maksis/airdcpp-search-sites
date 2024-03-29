import { Logger } from 'airdcpp-apisocket';
import { APIType } from '../api';

import { SearchItem } from './search-item';


export interface SessionInfo {
  system_info: {
    // api_feature_level: number;
    path_separator: string;
  }
}

export interface Context {
  api: APIType;
  logger: Logger;
  sessionInfo: SessionInfo;
  getSearchItems: () => SearchItem[];
}
