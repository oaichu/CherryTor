import test from 'node:test';
import assert from 'node:assert/strict';
import { StorageEngine } from '../../apps/web/src/storage/db.ts';
import type { SearchItem } from '../../packages/schemas/src/item.ts';

test('Storage Engine - sets and retrieves cached search results before TTL expiry', () => {
  const engine = new StorageEngine();
  const mockItem: SearchItem = {
    id: '1',
    title: 'Ubuntu 24.04 Desktop',
    category: 'Software',
    sizeBytes: 6000000000,
    seeders: 1000,
    leechers: 50,
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'canonical-releases'
  };

  engine.setCachedResults('ubuntu', ['canonical-releases'], [mockItem], 5000);
  const cached = engine.getCachedResults('ubuntu', ['canonical-releases']);
  assert.ok(cached);
  assert.equal(cached?.length, 1);
  assert.equal(cached?.[0]?.title, 'Ubuntu 24.04 Desktop');
});

test('Storage Engine - expires cache entry after TTL', async () => {
  const engine = new StorageEngine();
  const mockItem: SearchItem = {
    id: '1',
    title: 'Ubuntu',
    category: 'Software',
    sizeBytes: 100,
    seeders: 1,
    leechers: 1,
    infoHash: '2b9e19d8463e264ef81c81ef40d41d1a1ecde012',
    sourceId: 'canonical-releases'
  };

  engine.setCachedResults('ubuntu', ['canonical-releases'], [mockItem], 10); // 10ms TTL
  await new Promise(r => setTimeout(r, 25));

  const cached = engine.getCachedResults('ubuntu', ['canonical-releases']);
  assert.equal(cached, null);
});

test('Storage Engine - clears search history and respects privacy toggle', () => {
  const engine = new StorageEngine();
  engine.addSearchHistory('ubuntu');
  engine.addSearchHistory('arch');
  assert.equal(engine.getSearchHistory().length, 2);

  engine.clearSearchHistory();
  assert.equal(engine.getSearchHistory().length, 0);

  // Disable history
  engine.updateSettings({ historyEnabled: false });
  engine.addSearchHistory('debian');
  assert.equal(engine.getSearchHistory().length, 0);
});
