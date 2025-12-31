import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Check, Loader } from 'lucide-react';
import { UserProfile, ChatMessage, CareerRecommendation } from '../types';
import { storage } from '../utils/storage';
import { generateContent } from '../utils/gemini';
import { getResourcesForTopicAsString, getAllRoadmapsInfo } from '../utils/resourceService';
interface ChatInterfaceProps {
  profile: UserProfile;
  onRoleSelected: (role: string) => void;
  onGenerateRoadmapClick: (role: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  profile,
  onRoleSelected,
  onGenerateRoadmapClick,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChatHistory = async () => {
      const history = await storage.getChatHistory();
      setMessages(history);
    };
    loadChatHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const shouldShowCareerRecs = (text: string): boolean => {
    // Completely disable automatic career recommendations
    return false;
  };

  const getCareerRecommendations = (): CareerRecommendation[] => {
    return [
      {
        name: "Product Manager",
        justification: "Focus on defining product vision and strategy without extensive coding. Requires analytical thinking and stakeholder management."
      },
      {
        name: "Technical Project Manager",
        justification: "Manage technology projects and coordinate cross-functional teams. Emphasis on planning, execution, and communication rather than hands-on coding."
      },
      {
        name: "Cloud Solutions Architect",
        justification: "Design cloud infrastructure and migration strategies. Requires technical understanding but focuses on architecture rather than implementation."
      }
    ];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await storage.addChatMessage(userMessage);
    setInput('');
    setLoading(true);
    setRecommendations([]);
    setSelectedRole(null);
    setHasInteracted(true);

    try {
      // Use Gemini API directly
      try {
        // Check if user is asking about available roadmaps/resources
        const lowerInput = input.toLowerCase();
        const isAskingAboutRoadmaps = lowerInput.includes('roadmap') || lowerInput.includes('resource') || 
                               lowerInput.includes('available') || lowerInput.includes('what') || 
                               lowerInput.includes('list') || lowerInput.includes('offer') ||
                               lowerInput.includes('courses') || lowerInput.includes('tutorials') ||
                               lowerInput.includes('learning path') || lowerInput.includes('path');
        
        let additionalContext = '';
        if (isAskingAboutRoadmaps) {
          additionalContext = '\n\n' + getAllRoadmapsInfo();
        }
        
        // Get resources relevant to the user's input
        const relevantResourcesString = getResourcesForTopicAsString(input);
        
        const prompt = `You are a professional AI career advisor.
RULES:
1. Keep responses concise, professional, and to the point.
2. Avoid motivational speeches, emotional reassurance, or filler text.
3. Do NOT use asterisks (*) or Markdown formatting.
4. Focus on actionable, realistic career guidance.
5. Do NOT claim absolute accuracy or guarantees.
6. Treat this as an advisory tool, not a counseling session.
7. Do NOT automatically suggest learning resources unless specifically asked.
8. Only provide resource recommendations when the user explicitly requests them.
9. After answering the user's main query, append a short "Next you can explore:" section with exactly ONE follow-up suggestion related to the current topic. The follow-up must be phrased as a clickable suggestion or hint, not a direct question. The follow-up should feel optional and subtle, not conversational or intrusive. Keep responses concise, professional, and point-focused. The follow-up logic must be topic-aware (example: Cloud → skills, salary, AI impact). Never ask multiple follow-ups in a single response.

Tone:
– Direct
– Practical
– Professional
– Neutral

Length:
– Medium-short (no essays)

Context:
– This is a prototype AI career roadmap platform for students and early professionals.

The user's profile is: ${JSON.stringify(profile)}. Their message is: ${input}.${additionalContext} Provide a helpful and personalized response following the rules above.`;        const aiResponse = await generateContent(prompt);
        
        // No need to add the old question since the new prompt handles follow-ups differently
        const finalResponse = aiResponse;
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: finalResponse,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        await storage.addChatMessage(assistantMessage);
        
        // Disabled automatic career recommendations
        // if (!hasInteracted && shouldShowCareerRecs(input)) {
        //   const careerRecs = getCareerRecommendations(); 
        //   setRecommendations(careerRecs);
        // }
      } catch (apiError: any) {
        console.error('Error calling Gemini API:', apiError);
        // Provide more specific error message
        let errorMessage = "I'm having trouble connecting to the AI service right now. Please try again later.";
        
        // Check if it's an API key issue
        if (apiError.message && apiError.message.includes('API_KEY')) {
          errorMessage = "API key error: Please check that your Gemini API key is correctly set in the .env file.";
        } else if (apiError.message) {
          errorMessage = `AI service error: ${apiError.message}`;
        }
        
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: errorMessage,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        await storage.addChatMessage(assistantMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      storage.addChatMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleShowCareers = async () => {
    setHasInteracted(true);
    const careerRecs = getCareerRecommendations();
    setRecommendations(careerRecs);
    
    const assistantMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Here are some tech career recommendations based on your profile:\n\nProduct Manager - Define product vision and strategy\nTechnical Project Manager - Manage technology projects\nCloud Solutions Architect - Design cloud infrastructure",
      timestamp: Date.now(),
    };
    
    setMessages((prev) => [...prev, assistantMessage]);
    await storage.addChatMessage(assistantMessage);
  };

  const handlePredefinedQuestion = async (question: string) => {
    setInput(question);
    setHasInteracted(true);
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await storage.addChatMessage(userMessage);
    
    try {
      setLoading(true);
      setRecommendations([]);
      setSelectedRole(null);
      
      // Check if user is asking about available roadmaps/resources
      const lowerQuestion = question.toLowerCase();
      const isAskingAboutRoadmaps = lowerQuestion.includes('roadmap') || lowerQuestion.includes('resource') || 
                             lowerQuestion.includes('available') || lowerQuestion.includes('what') || 
                             lowerQuestion.includes('list') || lowerQuestion.includes('offer') ||
                             lowerQuestion.includes('courses') || lowerQuestion.includes('tutorials') ||
                             lowerQuestion.includes('learning path') || lowerQuestion.includes('path');
      
      let additionalContext = '';
      if (isAskingAboutRoadmaps) {
        additionalContext = '\n\n' + getAllRoadmapsInfo();
      }
      
      // Get resources relevant to the user's input
      const relevantResourcesString = getResourcesForTopicAsString(question);
      
      const prompt = `You are a professional AI career advisor.
RULES:
1. Keep responses concise, professional, and to the point.
2. Avoid motivational speeches, emotional reassurance, or filler text.
3. Do NOT use asterisks (*) or Markdown formatting.
4. Focus on actionable, realistic career guidance.
5. Do NOT claim absolute accuracy or guarantees.
6. Treat this as an advisory tool, not a counseling session.
7. Do NOT automatically suggest learning resources unless specifically asked.
8. Only provide resource recommendations when the user explicitly requests them.
9. After answering the user's main query, append a short "Next you can explore:" section with exactly ONE follow-up suggestion related to the current topic. The follow-up must be phrased as a clickable suggestion or hint, not a direct question. The follow-up should feel optional and subtle, not conversational or intrusive. Keep responses concise, professional, and point-focused. The follow-up logic must be topic-aware (example: Cloud → skills, salary, AI impact). Never ask multiple follow-ups in a single response.

Tone:
– Direct
– Practical
– Professional
– Neutral

Length:
– Medium-short (no essays)

Context:
– This is a prototype AI career roadmap platform for students and early professionals.

The user's profile is: ${JSON.stringify(profile)}. Their message is: ${question}.${additionalContext} Provide a helpful and personalized response following the rules above.`;      
      const aiResponse = await generateContent(prompt);
      
      // No need to add the old question since the new prompt handles follow-ups differently
      const finalResponse = aiResponse;
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: finalResponse,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      await storage.addChatMessage(assistantMessage);
    } catch (error) {
      console.error('Error sending predefined question:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      storage.addChatMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    onRoleSelected(role);
    setHasInteracted(true);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome, {profile.name}!</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ask me anything about career paths, learning roadmaps, or next steps in tech.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Try asking:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handlePredefinedQuestion('What career fits me?')}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                  >
                    What career fits me?
                  </button>
                  <button
                    onClick={() => handlePredefinedQuestion('Show me tech roles')}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                  >
                    Show me tech roles
                  </button>
                  <button
                    onClick={() => handlePredefinedQuestion('Career advice')}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1.5 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                  >
                    Career advice
                  </button>
                </div>
              </div>
              <button
                onClick={async () => await handleShowCareers()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
              >
                Show Career Recommendations
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className="mt-2 text-xs opacity-70 hover:opacity-100 flex items-center gap-1 text-gray-700 dark:text-gray-300"
                    >
                      {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === msg.id ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {recommendations.length > 0 && (
              <div className="space-y-2">
                {!hasInteracted && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Choose a role to get started:</div>
                )}
                {recommendations.map((rec, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleRoleSelect(rec.name);
                      onGenerateRoadmapClick(rec.name);
                    }}
                    className={`w-full text-left p-3 rounded-lg border-2 transition ${
                      selectedRole === rec.name
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">{rec.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{rec.justification}</div>
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Loader size={16} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about careers, skills, or learning paths..."
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};