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

// export type FileContentType = 'audio' | 'compressed' | 'document' | 
//  'executable' | 'picture' | 'video' | 'other' | 'filelist';

export interface DirectoryType {
  id: 'directory';
}

export interface FileType {
  id: 'file';
}

export type FileItemType = FileType | DirectoryType;

export interface MessageHighlight {
  id: number;
  text: string;
  type: MessageHighlightType;
}

export interface Bundle {
  id: number;
  target: string;
  type: FileItemType;
}

export interface FilelistItem {
  id: number;
  path: string;
  type: FileItemType;
}

export interface GroupedSearchResult {
  id: string;
  path: string;
  type: FileItemType;
}
