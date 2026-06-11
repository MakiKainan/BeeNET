export interface Comment {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  body: string;
  image?: string;
}

export interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  category: string;
  title: string;
  body: string;
  image?: string;
  replies: number;
  upvotes: number;
  tag: string;
  voted?: 'up' | 'down' | null;
  comments: Comment[];
}

export interface Facility {
  id: string;
  title: string;
  location: string;
  campus: string;
  rating: number;
  pricePerHour: number;
  image: string;
  isVerified: boolean;
  amenities: { icon: string; name: string }[];
  fullyBooked: boolean;
}

export interface GameSession {
  id: string;
  title: string;
  location: string;
  time: string;
  playersJoined: number;
  playersMax: number;
  sport: string;
  level: string;
  hostName: string;
  hostAvatar: string;
  hostId: string;
  image: string;
  hasJoined?: boolean;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  isYesterday: boolean;
}

export interface ScheduleItem {
  id: string;
  day: string;    // "01"–"31"
  month?: string; // "01"–"12", optional for backwards compat
  year?: string;  // "2026", optional for backwards compat
  title: string;
  location: string;
  color: 'primary' | 'secondary' | 'tertiary' | 'success';
  time: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  department: string;
  avatar: string;
  level: number;
  athleteTier: string;
  points: number;
  futsalProgress: number;
  basketballProgress: number;
  tennisProgress: number;
  password?: string;
}
