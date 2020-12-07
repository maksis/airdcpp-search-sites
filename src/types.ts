import { Context } from './context';


// Internal
export type ItemInfoGetter<IdT, EntityIdT> = (context: Context, selectedIds: IdT[], entityId: EntityIdT) => Promise<string[]>;

export interface SearchItem {
  name: string;
  url: string;
  clean: boolean;
  icon?: string;
}

// API
export const enum SeverityEnum {
  NOTIFY = 'notify',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export const enum MessageHighlightType {
  LINK_URL = 'link_url',
  LINK_TEXT = 'link_text',
  USER = 'user',
  BOLD = 'bold',
}

export interface MessageHighlight {
  id: number;
  text: string;
  // description_id: string;
  // position: {
  //   start: number;
  //   end: number;
  // };
  type: MessageHighlightType;
  // dupe: Dupe | null;
  // content_type: FileContentType | null;
}

export interface Bundle {
  id: number;
  target: string;
}

export interface FilelistItem {
  id: number;
  path: string;
}

export interface GroupedSearchResult {
  id: string;
  path: string;
}
