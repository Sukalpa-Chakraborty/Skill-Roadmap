import { CareerRecommendation, PersonalizedRoadmap, PortfolioData } from '../types';

export const portfolioService = {
  sendChatMessage: async (): Promise<string> => {
    return 'AI features are not available at the moment.';
  },

  getCareerRecommendations: async (): Promise<CareerRecommendation[]> => {
    return [];
  },

  generatePersonalizedRoadmap: async (): Promise<PersonalizedRoadmap> => {
    throw new Error('Not implemented');
  },

  generatePortfolio: async (): Promise<PortfolioData> => {
    throw new Error('Not implemented');
  },

  isConfigured: (): boolean => {
    return false;
  },
};