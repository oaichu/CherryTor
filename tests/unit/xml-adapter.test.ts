import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRssXmlFeed } from '../../packages/providers/src/xml-adapter.ts';

test('XML / RSS Adapter - extracts valid torrent items from RSS feed text', () => {
  const mockRss = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
      <title>LinuxTracker Feed</title>
      <item>
        <title>Alpine Linux 3.20.0 Standard x86_64</title>
        <link>magnet:?xt=urn:btih:11223344556677889900aabbccddeeff11223344&amp;dn=Alpine+Linux</link>
        <pubDate>Thu, 15 Aug 2026 10:00:00 GMT</pubDate>
      </item>
      <item>
        <title><![CDATA[Void Linux Base glibc]]></title>
        <link>https://linuxtracker.org/download.php?id=123</link>
        <enclosure url="magnet:?xt=urn:btih:99887766554433221100ffeeddccbbaa99887766" length="500000000" type="application/x-bittorrent"/>
      </item>
    </channel>
    </rss>
  `;

  const items = parseRssXmlFeed(mockRss, 'linuxtracker', 'Software');
  assert.equal(items.length, 2);
  assert.equal(items[0]?.title, 'Alpine Linux 3.20.0 Standard x86_64');
  assert.equal(items[0]?.infoHash, '11223344556677889900aabbccddeeff11223344');
  assert.equal(items[1]?.title, 'Void Linux Base glibc');
  assert.equal(items[1]?.infoHash, '99887766554433221100ffeeddccbbaa99887766');
});
