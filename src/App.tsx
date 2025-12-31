import { useState, useEffect } from 'react';
import { MessageSquare, Compass, FileText, LogOut, Sun, Moon } from 'lucide-react';
import { UserProfile, PersonalizedRoadmap, PortfolioData, SurveyData } from './types';
import { OnboardingModal } from './components/OnboardingModal';
import { SurveyModal } from './components/SurveyModal';
import { AIPoweredRecommendations } from './components/AIPoweredRecommendations';
import { ChatInterface } from './components/ChatInterface';
import { RoadmapSearch } from './components/RoadmapSearch';
import { RoadmapTimeline } from './components/RoadmapTimeline';
import { PortfolioGenerator } from './components/PortfolioGenerator';
import { ExploreMoreModal } from './components/ExploreMoreModal';
import { FeedbackModal } from './components/FeedbackModal';
import { storage } from './utils/storage';

type ViewType = 'chat' | 'roadmaps' | 'roadmap-detail' | 'portfolio';
type AppState = 'onboarding' | 'survey' | 'ai-recommendations' | 'main-app';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('chat');
  const [previousView, setPreviousView] = useState<ViewType>('chat');

  const [showExploreMore, setShowExploreMore] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<PersonalizedRoadmap | null>(null);
  const [generatedPortfolio, setGeneratedPortfolio] = useState<PortfolioData | null>(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };





  useEffect(() => {
    // Check if user has profile saved
    const loadProfile = async () => {
      const savedProfile = storage.getUserProfile();
      if (savedProfile) {
        setProfile(savedProfile);
        // Check if survey data exists to determine next step
        if (!savedProfile.surveyData) {
          setAppState('survey');
        } else {
          setAppState('ai-recommendations');
        }
      } else {
        setProfile(null);
        setAppState('onboarding');
      }
    };
    
    loadProfile();
  }, []);

  const handleProfileComplete = async (newProfile: UserProfile) => {
    setProfile(newProfile);
    // Check if survey data exists, if not show survey
    if (!newProfile.surveyData) {
      setAppState('survey');
    } else {
      // If survey data exists, show AI recommendations
      setAppState('ai-recommendations');
      await storage.saveUserProfile(newProfile);
      storage.setVisited();
    }
  };

  const handleSurveyComplete = async (surveyData: SurveyData) => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        surveyData
      };
      setProfile(updatedProfile);
      setAppState('ai-recommendations');
      await storage.saveUserProfile(updatedProfile);
      storage.setVisited();
    }
  };



  const handleAIRecommendationsComplete = () => {
    setAppState('main-app');
  };

  const handleGenerateRoadmap = async (_role: string) => {
    if (!profile) return;

    setRoadmapLoading(true);
    setPreviousView(currentView);
    setCurrentView('roadmap-detail');

    try {
      // Roadmap generation logic will go here
    } catch (error) {
      console.error('Roadmap generation error:', error);
    } finally {
      setRoadmapLoading(false);
    }
  };

  const handleGeneratePortfolio = () => {
    setPreviousView(currentView);
    setCurrentView('portfolio');
  };

  const handlePortfolioComplete = async (portfolio: PortfolioData) => {
    setGeneratedPortfolio(portfolio);
    await storage.savePortfolio(portfolio);
  };

  const handleLogout = () => {
    storage.clearAllData();
    setProfile(null);
    setPreviousView(currentView);
    setCurrentView('chat');
    setGeneratedRoadmap(null);
    setGeneratedPortfolio(null);
    setAppState('onboarding');
  };

  // Show onboarding if no profile
  if (appState === 'onboarding') {
    return <OnboardingModal onComplete={handleProfileComplete} />;
  }

  // Show survey if needed
  if (appState === 'survey') {
    return <SurveyModal onComplete={handleSurveyComplete} />;
  }

  // Show AI recommendations after survey completion
  if (appState === 'ai-recommendations' && profile) {
    return <AIPoweredRecommendations profile={profile} onComplete={handleAIRecommendationsComplete} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Compass size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Skill Roadmap</h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                title="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-600"></div>



              <div className="text-sm">
                <p className="font-medium text-gray-900 dark:text-white">{profile?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{profile?.status}</p>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav className="w-48 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 space-y-2">
            <button
              onClick={() => {
                setPreviousView(currentView);
                setCurrentView('chat');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentView === 'chat'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare size={20} />
              <span>Chat & Guidance</span>
            </button>

            <button
              onClick={() => {
                setPreviousView(currentView);
                setCurrentView('roadmaps');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                currentView === 'roadmaps'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Compass size={20} />
              <span>Roadmaps</span>
            </button>

            {generatedRoadmap && (
              <button
                onClick={() => {
                  setPreviousView(currentView);
                  setCurrentView('roadmap-detail');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === 'roadmap-detail'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FileText size={20} />
                <span>My Roadmap</span>
              </button>
            )}

            {generatedPortfolio && (
              <button
                onClick={() => {
                  setPreviousView(currentView);
                  setCurrentView('portfolio');
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentView === 'portfolio'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FileText size={20} />
                <span>Portfolio</span>
              </button>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button 
              onClick={() => setShowExploreMore(true)}
              className="w-full text-left bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-xs text-blue-900 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 transition"
            >
              <p className="font-semibold">Explore More</p>
            </button>
            
            <button 
              onClick={() => setShowFeedbackModal(true)}
              className="w-full text-left bg-green-50 dark:bg-green-900/30 rounded-lg p-3 text-xs text-green-900 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/50 transition mt-2"
            >
              <p className="font-semibold">Feedback</p>
            </button>
          </div>
        </nav>



        <main className="flex-1 overflow-hidden relative">
          <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${currentView === 'chat' && profile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {currentView === 'chat' && profile && (
              <ChatInterface
                profile={profile}
                onRoleSelected={(role) => console.log('Selected role:', role)}
                onGenerateRoadmapClick={handleGenerateRoadmap}
              />
            )}
          </div>

          <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${currentView === 'roadmaps' && profile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {currentView === 'roadmaps' && profile && (
              <RoadmapSearch profile={profile} onGeneratePortfolio={handleGeneratePortfolio} />
            )}
          </div>

          <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${currentView === 'roadmap-detail' && generatedRoadmap && !roadmapLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {currentView === 'roadmap-detail' && generatedRoadmap && !roadmapLoading && (
              <RoadmapTimeline
                roadmap={generatedRoadmap}
                onGeneratePortfolio={handleGeneratePortfolio}
              />
            )}
          </div>

          <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${currentView === 'roadmap-detail' && roadmapLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {currentView === 'roadmap-detail' && roadmapLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Generating your personalized roadmap...</p>
                </div>
              </div>
            )}
          </div>

          <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${currentView === 'portfolio' && profile && generatedRoadmap ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {currentView === 'portfolio' && profile && generatedRoadmap && (
              <PortfolioGenerator
                profile={profile}
                roadmap={generatedRoadmap}
                onComplete={handlePortfolioComplete}
                onBack={() => {
                  setPreviousView(currentView);
                  setCurrentView('roadmap-detail');
                }}
              />
            )}
          </div>
        </main>
      </div>

      <ExploreMoreModal isOpen={showExploreMore} onClose={() => setShowExploreMore(false)} />
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
    </div>
  );
}

export default App;