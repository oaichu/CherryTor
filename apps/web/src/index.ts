/**
 * CherryTor Web Frontend Application Entry Point
 * Strictly adheres to INV-01..10, AATP-0301..0308, AATP-0501..0507, AATP-0601..0606
 */

import { SearchDispatcher } from './core/dispatcher.ts';
import { StorageEngine } from './storage/db.ts';
import { parseAndValidateMagnet } from '../../../packages/core/src/magnet.ts';
import { renderSafeResultRow } from './components/safe-render.ts';
import type { SearchItem } from '../../../packages/schemas/src/item.ts';

export class CherryTorApp {
  private readonly dispatcher: SearchDispatcher;
  private readonly storage: StorageEngine;
  private currentResults: SearchItem[] = [];
  private selectedItemId: string | null = null;

  constructor() {
    this.dispatcher = new SearchDispatcher();
    this.storage = new StorageEngine();
  }

  public init(): void {
    const settings = this.storage.getSettings();
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.documentElement.setAttribute('data-density', settings.density);
    document.documentElement.setAttribute('data-crt', settings.crtMode);
  }

  public getStorage(): StorageEngine {
    return this.storage;
  }

  public getDispatcher(): SearchDispatcher {
    return this.dispatcher;
  }

  public parseMagnet(uri: string) {
    return parseAndValidateMagnet(uri);
  }
}

// Global instance
export const cherryTor = new CherryTorApp();
