'use strict';

// Entry point for extension-specific code

// Helper method for adding context menu items, docs: https://github.com/airdcpp-web/airdcpp-apisocket-js/blob/master/GUIDE.md#addContextMenuItems
import { APISocket, addContextMenuItems } from 'airdcpp-apisocket';

// Settings manager docs: https://github.com/airdcpp-web/airdcpp-extension-settings-js
//@ts-ignore
import SettingsManager from 'airdcpp-extension-settings';
import { ExtensionEntryData } from 'airdcpp-extension';

import { CONFIG_VERSION, SettingDefinitions } from './settings';
import { Context, SessionInfo } from './types';
import { API } from './api';

import { 
  getMenuItems,
  FilelistItemGetter, QueueBundleItemGetter, SearchItemGetter,
  HubMessageHighlightItemGetter, PrivateChatMessageHighlightItemGetter,
} from './search-items';


// Entry point docs: https://github.com/airdcpp-web/airdcpp-extension-js#extension-entry-structure
// Socket reference: https://github.com/airdcpp-web/airdcpp-apisocket-js/blob/master/GUIDE.md
const Extension = function (socket: APISocket, extension: ExtensionEntryData) {
  const settings = SettingsManager(socket, {
    extensionName: extension.name, 
    configFile: extension.configPath + 'config.json',
    configVersion: CONFIG_VERSION,
    definitions: SettingDefinitions,
  });

  extension.onStart = async (sessionInfo: SessionInfo) => {
    await settings.load();
    
    // const searchItems: SearchItem[] = ;

    const subscriberInfo = {
      id: extension.name,
      name: 'Search sites extension'
    };

    const context: Context = {
      api: API(socket),
      logger: socket.logger,
      sessionInfo,
      getSearchItems: () => settings.getValue('search_items'),
    };

    if (settings.getValue('enable_search_menu')) {
      addContextMenuItems(
        socket,
        getMenuItems(context, SearchItemGetter),
        'grouped_search_result',
        subscriberInfo,
      );
    }

    if (settings.getValue('enable_filelist_menu')) {
      addContextMenuItems(
        socket,
        getMenuItems(context, FilelistItemGetter),
        'filelist_item',
        subscriberInfo,
      );
    }

    if (settings.getValue('enable_queue_menu')) {
      addContextMenuItems(
        socket,
        getMenuItems(context, QueueBundleItemGetter),
        'queue_bundle',
        subscriberInfo,
      );
    }

    if (settings.getValue('enable_message_highlight_menu')) {
      addContextMenuItems(
        socket,
        getMenuItems(context, HubMessageHighlightItemGetter),
        'hub_message_highlight',
        subscriberInfo,
      );

      addContextMenuItems(
        socket,
        getMenuItems(context, PrivateChatMessageHighlightItemGetter),
        'private_chat_message_highlight',
        subscriberInfo,
      );
    }
  };
};

export default Extension;
