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

test('XML / RSS Adapter - parses Chinese DMHY Anime feed with Base32 Magnet', () => {
  const dmhyRss = `
    <?xml version="1.0" encoding="utf-8"?>
    <rss version="2.0">
    <channel>
      <title>動漫花園</title>
      <item>
        <title><![CDATA[[沸班亚马制作组] 剧场版 鬼灭之刃 无限城篇 第一章 猗窝座再袭 V2 [1080p HEVC]]]></title>
        <link>http://share.dmhy.org/topics/view/724294.html</link>
        <pubDate>Thu, 06 Aug 2026 03:29:02 +0800</pubDate>
        <enclosure url="magnet:?xt=urn:btih:4F7NZYMA4GN3YDT4NQU3N3I6RHIXP3LZ&amp;dn=Kimetsu" length="1500000000" type="application/x-bittorrent" />
      </item>
    </channel>
    </rss>
  `;

  const items = parseRssXmlFeed(dmhyRss, 'dmhy', 'Anime');
  assert.equal(items.length, 1);
  assert.ok(items[0]?.title.includes('鬼灭之刃'));
  assert.equal(items[0]?.infoHash, '4f7nzyma4gn3ydt4nqu3n3i6rhixp3lz');
  assert.ok(items[0]?.magnetUri?.startsWith('magnet:?'));
});
