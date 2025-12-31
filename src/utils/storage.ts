import { UserProfile, ChatMessage, PersonalizedRoadmap, PortfolioData } from '../types';
import { createUser, getUser, saveChatMessage, getChatMessages, saveRoadmap, getRoadmaps, savePortfolio, getPortfolios } from './api';

// In-memory storage for temporary data
let currentUser: UserProfile | null = null;
let currentUserId: number | null = null;

export const storage = {
  getUserProfile: (): UserProfile | null => {
    if (currentUser) {
      return currentUser;
    }
    
    // Check localStorage for existing profile
    const storedProfile = localStorage.getItem('skillroadmap_user_profile');
    if (storedProfile) {
      try {
        const profile = JSON.parse(storedProfile);
        // Add default background if not present (for backward compatibility)
        if (!profile.background) {
          profile.background = 'CS';
        }
        currentUser = profile;
        return currentUser;
      } catch (error) {
        console.error('Failed to parse user profile:', error);
        return null;
      }
    }
    
    return null;
  },

  saveUserProfile: async (profile: UserProfile): Promise<void> => {
    try {
      // Create user in backend
      const userData = {
        name: profile.name,
        email: '',
        status: profile.status || ''
      };
      
      const response = await createUser(userData);
      currentUserId = response.id;
      currentUser = profile;
      
      // Store in localStorage as fallback
      localStorage.setItem('skillroadmap_user_profile', JSON.stringify(profile));
      localStorage.setItem('skillroadmap_user_id', currentUserId.toString());
    } catch (error) {
      console.error('Failed to save user profile to backend:', error);
      // Fallback to localStorage
      localStorage.setItem('skillroadmap_user_profile', JSON.stringify(profile));
    }
  },

  getChatHistory: async (): Promise<ChatMessage[]> => {
    if (!currentUserId) {
      const storedMessages = localStorage.getItem('skillroadmap_chat_history');
      return storedMessages ? JSON.parse(storedMessages) : [];
    }
    
    try {
      const messages = await getChatMessages(currentUserId);
      return messages;
    } catch (error) {
      console.error('Failed to fetch chat history from backend:', error);
      // Fallback to localStorage
      const storedMessages = localStorage.getItem('skillroadmap_chat_history');
      return storedMessages ? JSON.parse(storedMessages) : [];
    }
  },

  saveChatHistory: async (messages: ChatMessage[]): Promise<void> => {
    // Save to localStorage as backup
    localStorage.setItem('skillroadmap_chat_history', JSON.stringify(messages));
    
    if (!currentUserId) return;
    
    // Save each message to backend
    try {
      for (const message of messages) {
        await saveChatMessage({
          user_id: currentUserId,
          role: message.role,
          content: message.content
        });
      }
    } catch (error) {
      console.error('Failed to save chat history to backend:', error);
    }
  },

  addChatMessage: async (message: ChatMessage): Promise<void> => {
    // Save to localStorage as backup
    const messages = await storage.getChatHistory();
    messages.push(message);
    localStorage.setItem('skillroadmap_chat_history', JSON.stringify(messages));
    
    if (!currentUserId) return;
    
    // Save to backend
    try {
      await saveChatMessage({
        user_id: currentUserId,
        role: message.role,
        content: message.content
      });
    } catch (error) {
      console.error('Failed to save chat message to backend:', error);
    }
  },

  getRoadmap: async (): Promise<PersonalizedRoadmap | null> => {
    if (!currentUserId) {
      const storedRoadmap = localStorage.getItem('skillroadmap_roadmap');
      return storedRoadmap ? JSON.parse(storedRoadmap) : null;
    }
    
    try {
      const roadmaps = await getRoadmaps(currentUserId);
      return roadmaps.length > 0 ? roadmaps[0] : null;
    } catch (error) {
      console.error('Failed to fetch roadmap from backend:', error);
      // Fallback to localStorage
      const storedRoadmap = localStorage.getItem('skillroadmap_roadmap');
      return storedRoadmap ? JSON.parse(storedRoadmap) : null;
    }
  },

  saveRoadmap: async (roadmap: PersonalizedRoadmap): Promise<void> => {
    // Save to localStorage as backup
    localStorage.setItem('skillroadmap_roadmap', JSON.stringify(roadmap));
    
    if (!currentUserId) return;
    
    // Save to backend
    try {
      await saveRoadmap({
        user_id: currentUserId,
        title: 'Personalized Roadmap',
        content: JSON.stringify(roadmap)
      });
    } catch (error) {
      console.error('Failed to save roadmap to backend:', error);
    }
  },

  getPortfolio: async (): Promise<PortfolioData | null> => {
    if (!currentUserId) {
      const storedPortfolio = localStorage.getItem('skillroadmap_portfolio');
      return storedPortfolio ? JSON.parse(storedPortfolio) : null;
    }
    
    try {
      const portfolios = await getPortfolios(currentUserId);
      return portfolios.length > 0 ? portfolios[0] : null;
    } catch (error) {
      console.error('Failed to fetch portfolio from backend:', error);
      // Fallback to localStorage
      const storedPortfolio = localStorage.getItem('skillroadmap_portfolio');
      return storedPortfolio ? JSON.parse(storedPortfolio) : null;
    }
  },

  savePortfolio: async (portfolio: PortfolioData): Promise<void> => {
    // Save to localStorage as backup
    localStorage.setItem('skillroadmap_portfolio', JSON.stringify(portfolio));
    
    if (!currentUserId) return;
    
    // Save to backend
    try {
      await savePortfolio({
        user_id: currentUserId,
        title: 'Personal Portfolio',
        content: JSON.stringify(portfolio)
      });
    } catch (error) {
      console.error('Failed to save portfolio to backend:', error);
    }
  },

  isFirstVisit: (): boolean => {
    const visited = localStorage.getItem('skillroadmap_first_visit');
    return !visited;
  },

  setVisited: (): void => {
    localStorage.setItem('skillroadmap_first_visit', 'true');
  },

  clearAllData: (): void => {
    localStorage.removeItem('skillroadmap_user_profile');
    localStorage.removeItem('skillroadmap_user_id');
    localStorage.removeItem('skillroadmap_chat_history');
    localStorage.removeItem('skillroadmap_roadmap');
    localStorage.removeItem('skillroadmap_portfolio');
    localStorage.removeItem('skillroadmap_first_visit');
    localStorage.removeItem('skillroadmap_recommendations');
    
    currentUser = null;
    currentUserId = null;
  },

  saveRecommendations: (recommendations: { name: string; justification: string }[]): void => {
    localStorage.setItem('skillroadmap_recommendations', JSON.stringify(recommendations));
  },

  getRecommendations: (): { name: string; justification: string }[] | null => {
    const stored = localStorage.getItem('skillroadmap_recommendations');
    return stored ? JSON.parse(stored) : null;
  }
};