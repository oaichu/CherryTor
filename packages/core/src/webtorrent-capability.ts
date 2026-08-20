/**
 * WebTorrent Capability Detection & P2P Privacy Controls (Phase 9)
 * In accordance with AATP-0901, AATP-0902, AATP-0903, AATP-0904, AATP-0905 & INV-09
 */

export type WebStreamCompatibilityState =
  | 'WEB_STREAM_POSSIBLE'
  | 'UNKNOWN'
  | 'EXTERNAL_CLIENT_RECOMMENDED';

export interface WebTorrentCapabilityResult {
  readonly supported: boolean;
  readonly hasWebRTC: boolean;
  readonly hasWebSocket: boolean;
  readonly hasWebCrypto: boolean;
}

export const P2P_PRIVACY_DISCLOSURE_TEXT =
  'P2P Notice (INV-09): Initiating browser stream establishes direct P2P connections and may expose your IP address to swarm peers. WebTorrent is completely isolated outside search security boundary.';

export function detectBrowserP2PCapabilities(): WebTorrentCapabilityResult {
  const hasWebRTC = typeof window !== 'undefined' && 'RTCPeerConnection' in window;
  const hasWebSocket = typeof window !== 'undefined' && 'WebSocket' in window;
  const hasWebCrypto = typeof crypto !== 'undefined' && 'subtle' in crypto;

  const supported = hasWebRTC && hasWebSocket && hasWebCrypto;

  return {
    supported,
    hasWebRTC,
    hasWebSocket,
    hasWebCrypto
  };
}

export function evaluateStreamCompatibility(
  category: string,
  trackers: readonly string[] = []
): WebStreamCompatibilityState {
  const hasWsTracker = trackers.some(t => t.startsWith('wss://') || t.startsWith('ws://'));
  const isVideoCategory = category === 'Movies' || category === 'TV' || category === 'Anime' || category === 'Music';

  if (hasWsTracker && isVideoCategory) {
    return 'WEB_STREAM_POSSIBLE';
  }

  if (isVideoCategory) {
    return 'UNKNOWN';
  }

  return 'EXTERNAL_CLIENT_RECOMMENDED';
}
