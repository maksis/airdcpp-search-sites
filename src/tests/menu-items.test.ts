import {
	FilelistItemGetter,
	HubMessageHighlightItemGetter,
	PrivateChatMessageHighlightItemGetter,
	QueueBundleItemGetter,
	SearchItemGetter,
} from 'src/search-items';

import { getUrls, itemUrlParser } from './helpers';

describe('Search items', () => {
	test('get bundle items', async () => {
		const urls = await getUrls(
			QueueBundleItemGetter,
      itemUrlParser([1, 2], ''),
		);
		expect(urls).toMatchSnapshot();
	});

	test('get search result items', async () => {
		const urls = await getUrls(
			SearchItemGetter,
			itemUrlParser(['mock-id1', 'mock-id2'], 1)
		);
		expect(urls).toMatchSnapshot();
	});

	test('get filelist items', async () => {
		const urls = await getUrls(
			FilelistItemGetter,
			itemUrlParser([1, 2], 'mock-filelist-id')
		);
		expect(urls).toMatchSnapshot();
	});

	test('hub message highlights', async () => {
		const urls = await getUrls(
			HubMessageHighlightItemGetter,
			itemUrlParser([1, 2], 4)
		);
		expect(urls).toMatchSnapshot();
	});

	test('private chat message highlights', async () => {
		const urls = await getUrls(
			PrivateChatMessageHighlightItemGetter,
			itemUrlParser([1, 2], 'mock-private-chat-id')
		);
		expect(urls).toMatchSnapshot();
	});
});
