
export interface UserProfile {
  id: string;
  name: string;
  university: string;
  branch: string;
  isNewAdmission: boolean;
  joinedAt: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export interface PeerGroup {
  id: string;
  university: string;
  branch: string;
  members: string[]; // User IDs
  messages: ChatMessage[];
}

export interface Hostel {
  name: string;
  location: string;
  priceRange: string;
  contact: string;
  description: string;
}

export interface Advertisement extends Hostel {
  tagline: string;
  rating: number;
  isPromoted: boolean;
}
