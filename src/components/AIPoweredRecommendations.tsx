import React, { useState, useEffect } from 'react';
import { UserProfile, SurveyData } from '../types';
import { generateContent } from '../utils/gemini';
import { storage } from '../utils/storage';

interface AIPoweredRecommendationsProps {
  profile: UserProfile;
  onComplete: (recommendedRoadmaps: { name: string; justification: string }[]) => void;
}

interface Recommendation {
  name: string;
  justification: string;
}

export const AIPoweredRecommendations: React.FC<AIPoweredRecommendationsProps> = ({ 
  profile, 
  onComplete 
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        // Prepare the user profile data for the AI
        const surveyData = profile.surveyData;
        if (!surveyData) {
          throw new Error('Survey data is missing');
        }

        // Create a detailed prompt for the AI with all user data
        const prompt = `You are a professional AI career advisor. Analyze the following user profile and provide the top 2 most suitable career roadmaps.

User Profile:
- Name: ${profile.name}
- Status: ${profile.status}
- Organization: ${profile.organization}
- Hours per week available: ${profile.hoursPerWeek}
- Background: ${profile.background}

Survey Data:
- Education Level: ${surveyData.educationLevel}
- College Tier: ${surveyData.collegeTier}
- Field Interests: ${surveyData.fieldInterests.join(', ')}
- Coding Comfort: ${surveyData.codingComfort}
- Math Comfort: ${surveyData.mathComfort}
- Career Goal Priorities: ${surveyData.careerGoalPriorities.join(', ')}
- Placement Timeline: ${surveyData.placementTimeline}
- Tools Used: ${surveyData.toolsUsed}
- Project Experience: ${surveyData.projectExperience}
- Learning Style: ${surveyData.learningStyle}

Analyze all this information comprehensively and return ONLY the top 2 most suitable career roadmaps. For each roadmap, provide:
1. Roadmap name/title
2. One-line reason explaining why it fits the user's profile

Format the response exactly as follows:
RECOMMENDATION 1:
Title: [Roadmap Name]
Reason: [One-line explanation]

RECOMMENDATION 2:
Title: [Roadmap Name]
Reason: [One-line explanation]

Do not include any additional commentary beyond the two roadmap recommendations.`;

        const aiResponse = await generateContent(prompt);

        // Parse the AI response to extract recommendations
        const parsedRecommendations = parseRecommendations(aiResponse);
        
        if (parsedRecommendations.length === 0) {
          throw new Error('AI did not return valid recommendations');
        }

        setRecommendations(parsedRecommendations);
        
        // Store the recommendations temporarily for later use by chatbot
        await storage.saveRecommendations(parsedRecommendations);
      } catch (err) {
        console.error('Error getting AI recommendations:', err);
        setError(err instanceof Error ? err.message : 'Failed to get recommendations');
        
        // Provide fallback recommendations in case of error
        setRecommendations([
          { name: 'Web Frontend Developer', justification: 'Based on your interest in development and general tech skills' },
          { name: 'Data Analyst', justification: 'Matches well with analytical thinking and structured approach' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [profile]);

  const parseRecommendations = (response: string): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Extract recommendation 1
    const recommendation1Match = response.match(/RECOMMENDATION 1:[\s\S]*?Title: ([^\n\r]+)[\s\S]*?Reason: ([^\n\r]+)/i);
    if (recommendation1Match) {
      recommendations.push({
        name: recommendation1Match[1].trim(),
        justification: recommendation1Match[2].trim()
      });
    }
    
    // Extract recommendation 2
    const recommendation2Match = response.match(/RECOMMENDATION 2:[\s\S]*?Title: ([^\n\r]+)[\s\S]*?Reason: ([^\n\r]+)/i);
    if (recommendation2Match) {
      recommendations.push({
        name: recommendation2Match[1].trim(),
        justification: recommendation2Match[2].trim()
      });
    }
    
    return recommendations;
  };

  const handleContinue = () => {
    if (recommendations) {
      onComplete(recommendations);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Analyzing your profile and generating personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Error</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{error}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">We're showing fallback recommendations.</p>
          {recommendations && (
            <div className="space-y-4 mb-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white">{rec.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{rec.justification}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Skill Roadmap</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">you are getting matched with these fields !</h1>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            {recommendations && recommendations.map((rec, index) => (
              <div 
                key={index} 
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4 last:mb-0 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{rec.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{rec.justification}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You can now explore other roadmaps or continue with your personalized AI mentor.
            </p>
            <button
              onClick={handleContinue}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};