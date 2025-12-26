
import { UserProfile, PeerGroup, ChatMessage } from '../types';

const STORAGE_KEYS = {
  USER: 'freshconnect_current_user',
  GROUPS: 'freshconnect_groups',
  ALL_USERS: 'freshconnect_all_users'
};

/**
 * Normalizes input strings for consistent matching
 */
export const normalize = (str: string) => str.toLowerCase().trim().replace(/\s+/g, ' ');

export const storageService = {
  // Get current session user
  getCurrentUser: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  // Save registration data and trigger matching
  registerUser: (profile: Omit<UserProfile, 'id' | 'joinedAt'>): UserProfile => {
    const newUser: UserProfile = {
      ...profile,
      id: Math.random().toString(36).substr(2, 9),
      joinedAt: Date.now(),
      university: normalize(profile.university),
      branch: normalize(profile.branch)
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    
    // Add to all users list
    const allUsers = storageService.getAllUsers();
    allUsers.push(newUser);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(allUsers));

    // Perform initial group match
    storageService.findAndJoinGroup(newUser);

    return newUser;
  },

  getAllUsers: (): UserProfile[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
    return data ? JSON.parse(data) : [];
  },

  getGroups: (): PeerGroup[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Peer Matching Logic:
   * 1. Filter existing groups by normalized University and Branch
   * 2. Find a group with space (less than 5 members)
   * 3. If found, join it.
   * 4. If not found, create a new one.
   */
  findAndJoinGroup: (user: UserProfile, excludeGroupId?: string): string => {
    const groups = storageService.getGroups();
    
    let targetGroup = groups.find(g => 
      g.university === user.university && 
      g.branch === user.branch && 
      g.members.length < 5 &&
      g.id !== excludeGroupId
    );

    if (targetGroup) {
      targetGroup.members.push(user.id);
    } else {
      targetGroup = {
        id: `group_${Math.random().toString(36).substr(2, 9)}`,
        university: user.university,
        branch: user.branch,
        members: [user.id],
        messages: []
      };
      groups.push(targetGroup);
    }

    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    return targetGroup.id;
  },

  /**
   * Group Switching Logic:
   * 1. Remove user from current group
   * 2. Find a new group (excluding the current one)
   */
  changeGroup: (userId: string): string | null => {
    const user = storageService.getAllUsers().find(u => u.id === userId);
    if (!user) return null;

    const groups = storageService.getGroups();
    const currentGroup = groups.find(g => g.members.includes(userId));
    
    if (currentGroup) {
      currentGroup.members = currentGroup.members.filter(id => id !== userId);
      // Clean up empty groups if needed (optional)
    }

    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    return storageService.findAndJoinGroup(user, currentGroup?.id);
  },

  // Get the group the user is currently in
  getCurrentGroup: (userId: string): PeerGroup | null => {
    const groups = storageService.getGroups();
    return groups.find(g => g.members.includes(userId)) || null;
  },

  // Messaging logic within a group
  sendMessage: (groupId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): void => {
    const groups = storageService.getGroups();
    const group = groups.find(g => g.id === groupId);
    if (group) {
      group.messages.push({
        ...message,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now()
      });
      localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
    }
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};
