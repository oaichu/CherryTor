import type { Category } from '../../schemas/src/item.ts';

/**
 * Intelligent Multi-Signal Category Classifier for Torrent Swarms
 * Classifies raw provider category tags, numeric codes, and titles into canonical categories.
 */
export function detectCategory(
  rawCat: string | number | null | undefined,
  title: string,
  sourceId: string
): Category {
  const lowerTitle = title.toLowerCase();
  const lowerCat = String(rawCat ?? '').toLowerCase();

  // 1. Source ID Dedicated Profiles
  if (sourceId === 'yts') return 'Movies';
  if (sourceId === 'eztv') return 'TV';
  if (sourceId === 'fitgirl' || sourceId === 'dodi') return 'Games';
  if (sourceId === 'linuxtracker' || sourceId === 'archive-org-software') return 'Software';
  if (sourceId === 'archive-org-audio') return 'Music';
  if (sourceId === 'archive-org-texts') return 'Books';

  // 2. Numeric Category Mapping (ThePirateBay / Apibay)
  if (rawCat !== null && rawCat !== undefined && !isNaN(Number(rawCat))) {
    const num = Number(rawCat);
    if (num >= 100 && num < 200) return 'Music';
    if (num >= 200 && num < 300) {
      if (num === 205 || num === 208 || lowerTitle.includes('s0') || lowerTitle.includes('season') || /\be\d{1,3}\b/i.test(lowerTitle)) return 'TV';
      return 'Movies';
    }
    if (num >= 300 && num < 400) return 'Software';
    if (num >= 400 && num < 500) return 'Games';
    if (num >= 600 && num < 700) {
      if (num === 601 || num === 602 || num === 603) return 'Books';
      return 'Other';
    }
  }

  // 3. String Category Mapping (DMHY, Nyaa, ACG.RIP, Bangumi, SolidTorrents)
  if (lowerCat.includes('movie') || lowerCat.includes('film') || lowerCat.includes('电影') || lowerCat.includes('映画') || lowerCat.includes('劇場版')) {
    return 'Movies';
  }
  if (lowerCat.includes('tv') || lowerCat.includes('series') || lowerCat.includes('show') || lowerCat.includes('剧集') || lowerCat.includes('ドラマ') || lowerCat.includes('drama') || lowerCat.includes('日剧') || lowerCat.includes('韩剧') || lowerCat.includes('美剧')) {
    return 'TV';
  }
  if (lowerCat.includes('anime') || lowerCat.includes('動畫') || lowerCat.includes('动画') || lowerCat.includes('アニメ') || lowerCat.includes('ova') || lowerCat.includes('raw') || lowerCat.includes('subbed')) {
    return 'Anime';
  }
  if (lowerCat.includes('music') || lowerCat.includes('audio') || lowerCat.includes('flac') || lowerCat.includes('音乐') || lowerCat.includes('音楽') || lowerCat.includes('mp3') || lowerCat.includes('ost') || lowerCat.includes('soundtrack')) {
    return 'Music';
  }
  if (lowerCat.includes('game') || lowerCat.includes('游戏') || lowerCat.includes('遊戲') || lowerCat.includes('ゲーム') || lowerCat.includes('repack')) {
    return 'Games';
  }
  if (lowerCat.includes('book') || lowerCat.includes('ebook') || lowerCat.includes('manga') || lowerCat.includes('comic') || lowerCat.includes('漫画') || lowerCat.includes('漫畫') || lowerCat.includes('书籍') || lowerCat.includes('小説') || lowerCat.includes('小说') || lowerCat.includes('pdf')) {
    return 'Books';
  }
  if (lowerCat.includes('app') || lowerCat.includes('software') || lowerCat.includes('program') || lowerCat.includes('linux') || lowerCat.includes('windows') || lowerCat.includes('iso') || lowerCat.includes('os') || lowerCat.includes('android')) {
    return 'Software';
  }

  // 4. Keyword Heuristics on Title
  // Music first (OST, FLAC, Album)
  if (/\b(flac|alac|wav|lossless|ost|soundtrack|discography|album|singles?|hi-res|vinyl|320kbps|op\/ed)\b/i.test(lowerTitle) || /\[(?:flac|wav|alac|mp3)\]/i.test(lowerTitle)) {
    return 'Music';
  }
  // Games (Repack, PC Game, Console)
  if (/\b(repack|fitgirl|dodi|codex|skidrow|empress|plaza|pc\s*game|v1\.\d+|crack|setup\.exe|nintendo|switch|ps4|ps5|xbox|steamrip|gog)\b/i.test(lowerTitle) || /\[(?:game|repack)\]/i.test(lowerTitle)) {
    return 'Games';
  }
  // Books (Manga, PDF, EPUB)
  if (/\b(epub|pdf|mobi|azw3|comic|manga|vol\.\d+|ch\.\d+|cbr|cbz|ebook|light\s*novel)\b/i.test(lowerTitle) || /\[(?:manga|comic|epub|pdf)\]/i.test(lowerTitle)) {
    return 'Books';
  }
  // Software / OS
  if (/\b(windows\s*\d+|ubuntu|debian|fedora|arch\s*linux|macos|iso|dmg|x86_64|amd64|x64|v\d+\.\d+\.\d+|portable|build\s*\d+|adobe|photoshop|autocad|office\s*\d+)\b/i.test(lowerTitle)) {
    return 'Software';
  }
  // Anime
  if (/\b(anime|bilibili|webrip|bdrip|hevc|opus|chs_jp|cht_jp|sub|fansub|raw)\b/i.test(lowerTitle) && (lowerTitle.includes('篇') || lowerTitle.includes('话') || lowerTitle.includes('話') || lowerTitle.includes('第') || /\[\d{1,3}\]/i.test(lowerTitle))) {
    return 'Anime';
  }
  // TV Shows & Series
  if (/\b(s\d{1,2}e\d{1,2}|s\d{1,2}\b|season\s*\d+|episode\s*\d+|complete\s*series|hdtv)\b/i.test(lowerTitle)) {
    return 'TV';
  }
  // Movies (Avatar, 1080p, 2160p, BluRay, Web-DL, Remux)
  if (/\b(1080p|720p|2160p|4k|bluray|bdrip|web-dl|webrip|hdrip|x264|x265|hevc|remux|extended|director'?s\s*cut)\b/i.test(lowerTitle)) {
    return 'Movies';
  }

  return 'Other';
}
