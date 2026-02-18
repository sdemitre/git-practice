
export type InteractionType = 'like' | 'view';

export interface Post {
  id: string;
  author: string;
  handle: string;
  content: string;
  topic: string;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  interests: Record<string, number>; // Topic -> Score
}

// Mock Data
const INITIAL_POSTS: Post[] = [
  { id: '1', author: 'Tech Insider', handle: '@techinsider', content: ' The new quantum processor is 1000x faster than current gen! #tech #quantum', topic: 'tech', likes: 120 },
  { id: '2', author: 'Foodie Heaven', handle: '@foodie', content: 'Just tried the best ramen in Tokyo! 🍜 #food #travel', topic: 'food', likes: 85 },
  { id: '3', author: 'Space Explorer', handle: '@cosmos', content: 'Mars colonization plans are moving forward. launch window in 2028. 🚀 #space', topic: 'space', likes: 500 },
  { id: '4', author: 'React Dev', handle: '@reactjs', content: 'React Server Components are a game changer for bundle sizes. #coding #react', topic: 'tech', likes: 230 },
  { id: '5', author: 'Cat Lovers', handle: '@paws', content: 'Look at this fluff ball! 😻 #cats #cute', topic: 'animals', likes: 1500 },
  { id: '6', author: 'Crypto King', handle: '@btc_king', content: 'Bitcoin breaking resistance! 🚀🌑 #crypto #finance', topic: 'finance', likes: 50 },
  { id: '7', author: 'Gardening Tips', handle: '@green_thumb', content: 'Best time to plant tomatoes is now! 🍅 #garden', topic: 'lifestyle', likes: 30 },
  { id: '8', author: 'Movie Buff', handle: '@cinema', content: 'The new Dune movie is a masterpiece in visual storytelling. #movies', topic: 'entertainment', likes: 450 },
  { id: '9', author: 'Politics Watch', handle: '@pol_watch', content: 'Senate passes new bill on infrastructure. #politics #news', topic: 'politics', likes: 120 },
  { id: '10', author: 'Fit Life', handle: '@gym_rat', content: 'Never skip leg day! 💪 #fitness #health', topic: 'health', likes: 300 },
  { id: '11', author: 'AI Daily', handle: '@ai_news', content: 'AGI might be closer than we think. #ai #tech', topic: 'tech', likes: 900 },
  { id: '12', author: 'Travel Bug', handle: '@wanderlust', content: 'Sunset in Santorini is magical. 🌅 #travel', topic: 'travel', likes: 600 },
];

let currentUser: User = {
  id: 'user_1',
  name: 'Demo User',
  handle: '@demo_user',
  interests: {},
};

let userInteractions: { postId: string; type: InteractionType }[] = [];

// Helper to reset state
export function resetSystem() {
  currentUser.interests = {};
  userInteractions = [];
  console.log('System Reset: User interests cleared.');
}

// Algorithm Simulation
export function getFeed(): Post[] {
  // If no interests, return mixed/shuffled feed
  if (Object.keys(currentUser.interests).length === 0) {
    return [...INITIAL_POSTS].sort(() => Math.random() - 0.5);
  }

  // Score posts based on interests
  return [...INITIAL_POSTS].sort((a, b) => {
    const scoreA = (currentUser.interests[a.topic] || 0) + Math.random() * 2; // Add some noise
    const scoreB = (currentUser.interests[b.topic] || 0) + Math.random() * 2;
    return scoreB - scoreA; // Descending
  });
}

export function recordInteraction(postId: string, type: InteractionType) {
  const post = INITIAL_POSTS.find((p) => p.id === postId);
  if (!post) return;

  userInteractions.push({ postId, type });

  // Update Interest Profile
  const weight = type === 'like' ? 5 : 1; // Like is stronger than view
  currentUser.interests[post.topic] = (currentUser.interests[post.topic] || 0) + weight;
  
  console.log(`Updated interests:`, currentUser.interests);
}

export function getUserProfile() {
  return currentUser;
}
