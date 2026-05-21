export const YOUTUBE_CHANNEL_IDS: Record<string, string> = {
  ro: "UCBSPCOsCSnJdjyUwZK4Fxqg",
  ru: "UCFVO5GuZIizG2REQB_umhrw",
};

export const YOUTUBE_CHANNEL_URLS: Record<string, string> = {
  ro: "https://www.youtube.com/@emanuelbalti",
  ru: "https://www.youtube.com/@emanuelbalti_ru",
};

export const YOUTUBE_CHANNEL_AVATARS: Record<string, string> = {
  ro: "https://yt3.googleusercontent.com/Gg-8SEuAqp2BxpC_Efvxn6UZvDtdZfv15FqlDKJ088GrcncMz7s4WLAsQwWltmoLFyVBXTZuwg=s400-c-k-c0x00ffffff-no-rj",
  ru: "https://yt3.googleusercontent.com/R4D0y-EMiNJm-WMla4gcJ7CCy_9IKS4QTyBrltyzImFpl9c2I20opz3tolpJSAywM87wmJLqJA=s400-c-k-c0x00ffffff-no-rj",
};

export interface YouTubeVideo {
  id: string;
  title: string;
  published: Date;
  thumbnailUrl: string;
  videoUrl: string;
}

function decodeXML(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function getYouTubeVideos(
  stream: string,
  limit = 6
): Promise<YouTubeVideo[]> {
  const channelId = YOUTUBE_CHANNEL_IDS[stream];
  if (!channelId) return [];

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } } // re-fetch every hour
    );
    if (!res.ok) return [];

    const xml = await res.text();
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g) ?? [];

    return entries.slice(0, limit).map((entry) => {
      const videoId =
        (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ?? [])[1] ?? "";
      const title =
        (entry.match(/<title>([^<]+)<\/title>/) ?? [])[1] ?? "";
      const published =
        (entry.match(/<published>([^<]+)<\/published>/) ?? [])[1] ?? "";

      return {
        id: videoId,
        title: decodeXML(title),
        published: new Date(published),
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      };
    });
  } catch {
    return [];
  }
}
