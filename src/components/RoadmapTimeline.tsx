import React, { useState, useEffect } from 'react';
import { Youtube, FileText, BookOpen, Code, CheckCircle, Circle, Compass } from 'lucide-react';
import { PersonalizedRoadmap } from '../types';
import { isWeekCompleted, toggleWeekCompletion } from '../utils/progressTracking';
import { RealityPanel } from './RealityPanel';
import { ProjectsModal } from './ProjectsModal';
import { AICapabilitiesModal } from './AICapabilitiesModal';
import { FeedbackModal } from './FeedbackModal';

interface RoadmapTimelineProps {
  roadmap: PersonalizedRoadmap;
  onGeneratePortfolio: () => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ roadmap, onGeneratePortfolio }) => {
  const [completedWeeks, setCompletedWeeks] = useState<Record<number, boolean>>({});
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showAICapabilitiesModal, setShowAICapabilitiesModal] = useState(false);
  
  // Load completion status for all weeks
  useEffect(() => {
    const loadCompletionStatus = async () => {
      const completionStatus: Record<number, boolean> = {};
      const roadmapId = roadmap.id || roadmap.role.toLowerCase().replace(/\s+/g, '-');
      for (const week of roadmap.weeks) {
        completionStatus[week.week_number] = await isWeekCompleted(roadmapId, week.week_number);
      }
      setCompletedWeeks(completionStatus);
    };
    
    loadCompletionStatus();
  }, [roadmap]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube size={16} />;
      case 'article':
        return <FileText size={16} />;
      case 'course':
        return <BookOpen size={16} />;
      case 'documentation':
        return <Code size={16} />;
      default:
        return <FileText size={16} />;
    }
  };
  
  const handleToggleWeek = async (weekNumber: number) => {
    const roadmapId = roadmap.id || roadmap.role.toLowerCase().replace(/\s+/g, '-');
    await toggleWeekCompletion(roadmapId, weekNumber);
    
    // Update local state
    setCompletedWeeks(prev => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{roadmap.role} Roadmap</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {roadmap.totalWeeks} weeks • {roadmap.totalHours} hours total
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content - Weeks */}
            <div className="flex-1 space-y-6">
              {roadmap.weeks.map((week, idx) => (
                <div key={idx} className="relative animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col items-center">
                        <button 
                          onClick={() => handleToggleWeek(week.week_number)}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm focus:outline-none transition-transform duration-200 hover:scale-110"
                          aria-label={`Mark week ${week.week_number} as ${completedWeeks[week.week_number] ? 'not completed' : 'completed'}`}
                        >
                          {completedWeeks[week.week_number] ? (
                            <CheckCircle size={32} className="text-green-500" />
                          ) : (
                            <Circle size={32} className="text-gray-300 hover:text-blue-400" />
                          )}
                        </button>
                        <div className="text-xs mt-1 font-medium text-gray-500 dark:text-gray-400">
                          Week {week.week_number}
                        </div>
                      </div>
                      {idx < roadmap.weeks.length - 1 && (
                        <div className="w-1 h-24 bg-blue-200 mt-2"></div>
                      )}
                    </div>
              
                    <div className="pb-6 flex-1">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-5 border border-blue-200 dark:border-blue-700 animate-fadeIn">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-gray-900 dark:text-white">Week {week.week_number}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {completedWeeks[week.week_number] ? 'Completed' : 'Not completed'}
                          </span>
                        </div>
              
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Learning Goals</h4>
                            <ul className="space-y-1">
                              {week.learning_goals.map((goal, i) => (
                                <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2 animate-fadeIn" style={{ animationDelay: `${(idx * 0.1) + 0.1}s` }}>
                                  <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
              
                          <div>
                            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Estimated Hours: <span className="text-blue-600 dark:text-blue-400">{week.estimated_hours}h</span>
                            </div>
                          </div>
              
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Mini Project</h4>
                            <div className="bg-white dark:bg-gray-700 rounded p-3 border border-gray-200 dark:border-gray-600 animate-fadeIn" style={{ animationDelay: `${(idx * 0.1) + 0.15}s` }}>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">{week.mini_project.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{week.mini_project.description}</p>
                            </div>
                          </div>
              
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Resources</h4>
                            <div className="space-y-2">
                              {week.resources.map((resource, i) => (
                                <a
                                  key={i}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-start gap-3 p-2 hover:bg-white dark:hover:bg-gray-700 rounded transition group duration-200 hover:shadow-sm animate-fadeIn" style={{ animationDelay: `${(idx * 0.1) + 0.2}s` }}
                                >
                                  <span className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 mt-1">
                                    {getResourceIcon(resource.type)}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline break-words">
                                      {resource.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">{resource.type}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                      
            {/* Right Sidebar - Reality Panel */}
            <div className="lg:w-80">
              {roadmap.realityPanel && (
                <RealityPanel realityPanel={roadmap.realityPanel} />
              )}
              
              {/* AI Capabilities Button */}
              {[
                'Cloud Engineer', 'DevOps Engineer', 'DevSecOps Engineer', 'Web Frontend Developer', 
                'Web Backend Developer', 'Full Stack Developer', 'Data Analyst', 'Data Engineer', 
                'Machine Learning Engineer', 'AI Engineer', 'AI and Data Scientist', 'QA Engineer', 
                'Mobile Developer', 'Android Developer', 'iOS Developer', 'Cybersecurity Engineer', 
                'Software Architect', 'UX Designer', 'Technical Writer', 'Game Developer', 
                'Server Side Game Developer', 'MLOps Engineer', 'Product Manager', 'Engineering Manager', 
                'Developer Relations', 'BI Analyst'
              ].includes(roadmap.role) && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowAICapabilitiesModal(true)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-sm rounded-lg shadow transition-all duration-200 flex items-center justify-center"
                  >
                    Check How AI Can Leverage Your Work
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Check if this roadmap has specific projects to show */}
          {[
            'Cloud Engineer', 'DevOps Engineer', 'DevSecOps Engineer', 'Web Frontend Developer', 
            'Web Backend Developer', 'Full Stack Developer', 'Data Analyst', 'Data Engineer', 
            'Machine Learning Engineer', 'AI Engineer', 'AI and Data Scientist', 'QA Engineer', 
            'Mobile Developer', 'Android Developer', 'iOS Developer', 'Cybersecurity Engineer', 
            'Software Architect', 'UX Designer', 'Technical Writer', 'Game Developer', 
            'Server Side Game Developer', 'MLOps Engineer', 'Product Manager', 'Engineering Manager', 
            'Developer Relations', 'BI Analyst'
          ].includes(roadmap.role) && (
            <div className="mt-12 mb-8 flex justify-center">
              <button
                onClick={() => setShowProjectsModal(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Compass size={20} className="mr-2" />
                Explore More Projects
              </button>
            </div>
          )}
        </div>
      </div>
      
      <ProjectsModal 
        isOpen={showProjectsModal} 
        onClose={() => setShowProjectsModal(false)} 
        roadmapRole={roadmap.role} 
      />
      
      <AICapabilitiesModal
        isOpen={showAICapabilitiesModal}
        onClose={() => setShowAICapabilitiesModal(false)}
        role={roadmap.role}
      />
    </div>
  );
};