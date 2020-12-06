
export const SettingDefinitions = [
  {
    key: 'enable_queue_menu',
    title: 'Show in queue bundle context menu',
    default_value: true,
    type: 'boolean'
  }, {
    key: 'enable_search_menu',
    title: 'Show in search result context menu',
    default_value: true,
    type: 'boolean'
  }, {
    key: 'enable_filelist_menu',
    title: 'Show in filelist item context menu',
    default_value: true,
    type: 'boolean'
  }, {
    key: 'enable_message_highlight_menu',
    title: 'Show in message highlight context menu',
    default_value: true,
    type: 'boolean'
  }, {
		key: 'search_items',
		title: 'Search items',
		// optional: true,
		type: 'list',
		item_type: 'struct',
		definitions: [
			{
				key: 'name',
				title: 'Name',
				default_value: '',
				type: 'string',
			}, {
				key: 'clean',
				title: 'Attempt to clean extra words and separators from the search string',
				default_value: true,
				type: 'boolean',
			}, {
				key: 'url',
				title: 'URL',
				default_value: '',
				type: 'string',
				help: `Search string will be put at the end of the URL, unless there's {{searchString}} variable in the URL`,
			}, {
				key: 'icon',
				title: 'Icon',
				type: 'string',
				help: 'Icon names from https://semantic-ui.com/elements/icon.html can be shown in the Web UI',
				optional: true,
			},
    ],
		default_value: [
			{
        name: 'Google (full name)',
        url: 'https://www.google.com/search?q=',
        icon: 'google',
        clean: false,
			}, {
        name: 'Google (title)',
        icon: 'google',
        url: 'https://www.google.com/search?q=',
        clean: true,
			}, {
        name: 'IMDB',
        icon: 'yellow imdb',
        url: 'https://www.imdb.com/find?q=',
        clean: true,
      }
		],
	}
];

export const CONFIG_VERSION = 1;