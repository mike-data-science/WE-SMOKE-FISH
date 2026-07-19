import rawReviews from '../../output/reviews.json';

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  time: string;
  avatar: string;
  avatarUrl?: string;
}

export const reviewStats = {
  totalReviews: rawReviews.length,
  averageRating: rawReviews.reduce((acc: number, r: any) => acc + (r.stars || 5), 0) / rawReviews.length
};

export const googleReviews: Review[] = rawReviews
  .filter((r: any) => {
    const txt = r.text ? r.text.trim() : "";
    // Filter out completely empty or meaningless reviews
    if (!txt) return false;
    if (txt === "...") return false;
    if (txt === "…") return false;
    if (txt === "🤗🤗🤗 …") return false;
    if (txt === "😊 …") return false;
    if (txt === "🙏🏻🙏🏻🙏🏻 …") return false;
    if (txt === "👍👍👍 …") return false;
    if (txt === "🫶🤝 …") return false;
    return true;
  })
  .map((r: any) => ({
    id: String(r.index),
    author: r.reviewer_name || 'Anonymous',
    rating: r.stars || 5,
    text: r.text.trim().replace(/[\n\r]+/g, " ").replace(/…/g, "").trim(),
    time: r.posted || 'Recent',
    avatar: r.reviewer_name ? r.reviewer_name.charAt(0).toUpperCase() : 'U',
    avatarUrl: r.reviewer_photo_url ? r.reviewer_photo_url.replace(/=w\d+-h\d+.*$/, '=s128-c') : undefined
  }));
