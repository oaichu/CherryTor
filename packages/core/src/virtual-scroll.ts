/**
 * Virtual Scrolling & Windowing Calculation Helper for CherryTor
 * In accordance with AATP-0607
 */

export interface VirtualScrollInput {
  readonly totalItems: number;
  readonly rowHeight: number;
  readonly viewportHeight: number;
  readonly scrollTop: number;
  readonly overscan?: number; // buffer rows above and below
}

export interface VirtualScrollOutput {
  readonly startIndex: number;
  readonly endIndex: number;
  readonly totalHeight: number;
  readonly topPadding: number;
  readonly bottomPadding: number;
  readonly visibleCount: number;
}

export function calculateVirtualScroll(input: VirtualScrollInput): VirtualScrollOutput {
  const { totalItems, rowHeight, viewportHeight, scrollTop, overscan = 4 } = input;

  if (totalItems <= 0 || rowHeight <= 0 || viewportHeight <= 0) {
    return {
      startIndex: 0,
      endIndex: 0,
      totalHeight: 0,
      topPadding: 0,
      bottomPadding: 0,
      visibleCount: 0
    };
  }

  const totalHeight = totalItems * rowHeight;
  const rawStartIndex = Math.floor(Math.max(0, scrollTop) / rowHeight);
  const visibleItemsCount = Math.ceil(viewportHeight / rowHeight);

  const startIndex = Math.max(0, rawStartIndex - overscan);
  const endIndex = Math.min(totalItems, rawStartIndex + visibleItemsCount + overscan);

  const topPadding = startIndex * rowHeight;
  const bottomPadding = Math.max(0, (totalItems - endIndex) * rowHeight);

  return {
    startIndex,
    endIndex,
    totalHeight,
    topPadding,
    bottomPadding,
    visibleCount: endIndex - startIndex
  };
}
