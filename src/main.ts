'use strict';

// Entry point for extension-specific code

// Helper method for adding context menu items, docs: https://github.com/airdcpp-web/airdcpp-apisocket-js/blob/master/GUIDE.md#addContextMenuItems
import { APISocket, addContextMenuItems, EntityId } from 'airdcpp-apisocket';

// Settings manager docs: https://github.com/airdcpp-web/airdcpp-extension-settings-js
//@ts-ignore
import SettingsManager from 'airdcpp-extension-settings';
import { ExtensionEntryData } from 'airdcpp-extension';

import { CONFIG_VERSION, SettingDefinitions } from './settings';
import { Context, ItemInfoGetter, SessionInfo } from './types';
import { API } from './api';

import { 
  getMenuItems,
  FilelistItemGetter, QueueBundleItemGetter, SearchItemGetter,
  HubMessageHighlightItemGetter, PrivateChatMessageHighlightItemGetter,
} from './search-items';


const addMenuItems = async (context: Context, socket: APISocket, settings: any, extension: ExtensionEntryData) => {
  const subscriberInfo = {
    id: extension.name,
    name: 'Search sites'
  };

  let removeListeners: (() => void)[] = [];

  const addHook = async <IdT, EntityIdT extends EntityId | undefined>(
    settingId: string, 
    hookId: string, 
    itemInfoGetter: ItemInfoGetter<IdT, EntityIdT>
  ) => {
    if (settings.getValue(settingId)) {
      const removeCallback = await addContextMenuItems(
        socket, 
        getMenuItems(context, itemInfoGetter), 
        hookId, 
        subscriberInfo
      );

      removeListeners.push(removeCallback);
    }
  };

  await addHook('enable_search_menu', 'grouped_search_result', SearchItemGetter);
  await addHook('enable_filelist_menu', 'filelist_item', FilelistItemGetter);
  await addHook('enable_queue_menu', 'queue_bundle', QueueBundleItemGetter);
  await addHook('enable_message_highlight_menu', 'hub_message_highlight', HubMessageHighlightItemGetter);
  await addHook('enable_message_highlight_menu', 'private_chat_message_highlight', PrivateChatMessageHighlightItemGetter);

  return () => {
    removeListeners.forEach(remove => remove());
  };
};

// Entry point docs: https://github.com/airdcpp-web/airdcpp-extension-js#extension-entry-structure
// Socket reference: https://github.com/airdcpp-web/airdcpp-apisocket-js/blob/master/GUIDE.md
const Extension = function (socket: APISocket, extension: ExtensionEntryData) {
  const settings = SettingsManager(socket, {
    extensionName: extension.name, 
    configFile: extension.configPath + 'config.json',
    configVersion: CONFIG_VERSION,
    definitions: SettingDefinitions,
  });

  let removeListeners: () => void;

  extension.onStart = async (sessionInfo: SessionInfo) => {
    await settings.load();

    const context: Context = {
      api: API(socket),
      logger: socket.logger,
      sessionInfo,
      getSearchItems: () => settings.getValue('search_items'),
    };

    removeListeners = await addMenuItems(context, socket, settings, extension);

    settings.onValuesUpdated = async () => {
      // Reset menu item hooks
      removeListeners();
      removeListeners = await addMenuItems(context, socket, settings, extension);
    };
  };
};

export default Extension;
