import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateVirtualScroll } from '../../packages/core/src/virtual-scroll.ts';

test('Virtual Scroll - calculates window slice and top/bottom paddings accurately', () => {
  const result = calculateVirtualScroll({
    totalItems: 1000,
    rowHeight: 50,
    viewportHeight: 500, // 10 items visible
    scrollTop: 1000,     // scrolled 20 items down
    overscan: 2
  });

  assert.equal(result.totalHeight, 50000);
  assert.equal(result.startIndex, 18); // 20 - 2 overscan
  assert.equal(result.endIndex, 32);   // 20 + 10 + 2 overscan
  assert.equal(result.topPadding, 18 * 50);
  assert.equal(result.bottomPadding, (1000 - 32) * 50);
});

test('Virtual Scroll - handles top of list boundary with 0 scroll', () => {
  const result = calculateVirtualScroll({
    totalItems: 500,
    rowHeight: 40,
    viewportHeight: 400,
    scrollTop: 0,
    overscan: 3
  });

  assert.equal(result.startIndex, 0);
  assert.equal(result.topPadding, 0);
  assert.equal(result.endIndex, 13); // 10 + 3
});
