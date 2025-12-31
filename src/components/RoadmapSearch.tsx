import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Cloud, Zap, Code, Database, Brain, Stethoscope, Smartphone, Shield, Target, CheckCircle } from 'lucide-react';
import prebuiltRoadmaps from '../data/prebuilt_roadmaps.json';
import { RoadmapTimeline } from './RoadmapTimeline';
import { PersonalizedRoadmap, RoadmapWeek, UserProfile, PrebuiltRoadmap, RealityPanelData } from '../types';
import { getRoadmapCompletionPercentage } from '../utils/progressTracking';

interface RoadmapSearchProps {
  profile: UserProfile;
  onGeneratePortfolio: () => void;
}

export const RoadmapSearch: React.FC<RoadmapSearchProps> = ({ profile, onGeneratePortfolio }) => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<PersonalizedRoadmap | null>(null);
  const [completionPercentages, setCompletionPercentages] = useState<Record<string, number>>({});
  const roadmapListRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  // Load completion percentages for all roadmaps
  useEffect(() => {
    const loadCompletionPercentages = async () => {
      const percentages: Record<string, number> = {};
      for (const roadmap of prebuiltRoadmaps) {
        const roadmapId = roadmap.id;
        percentages[roadmapId] = await getRoadmapCompletionPercentage(roadmapId, roadmap.weeks.length);
      }
      setCompletionPercentages(percentages);
    };
    
    loadCompletionPercentages();
  }, []);

  // Restore scroll position when roadmap list is displayed
  useEffect(() => {
    if (!selectedRoadmap && roadmapListRef.current) {
      // Use setTimeout to ensure DOM is rendered before scrolling
      setTimeout(() => {
        roadmapListRef.current!.scrollTop = scrollPositionRef.current;
      }, 0);
    }
  }, [selectedRoadmap]);

  const roadmapIcons: { [key: string]: React.ReactNode } = {
    'Cloud Engineer': <Cloud size={24} />,
    'DevOps Engineer': <Zap size={24} />,
    'Web Frontend Developer': <Code size={24} />,
    'Web Backend Developer': <Database size={24} />,
    'Data Analyst': <Database size={24} />,
    'Machine Learning Engineer': <Brain size={24} />,
    'QA Engineer': <Stethoscope size={24} />,
    'Mobile Developer': <Smartphone size={24} />,
    'Cybersecurity Engineer': <Shield size={24} />,
    'Product Manager': <Target size={24} />,
  };

  if (selectedRoadmap) {
    return (
      <div className="flex flex-col h-full">
        <button
          onClick={() => {
            // Save current scroll position before navigating back
            if (roadmapListRef.current) {
              scrollPositionRef.current = roadmapListRef.current.scrollTop;
            }
            setSelectedRoadmap(null);
          }}
          className="flex items-center gap-2 px-4 py-3 text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          Back to Browse
        </button>
        <RoadmapTimeline roadmap={selectedRoadmap} onGeneratePortfolio={onGeneratePortfolio} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore Roadmaps</h1>
        </div>
      </div>

      <div ref={roadmapListRef} className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prebuiltRoadmaps.map((roadmap, idx) => {
              // Convert the prebuilt roadmap to a PersonalizedRoadmap by adding missing properties
              const weeks: RoadmapWeek[] = roadmap.weeks.map(week => ({
                ...week,
                resources: week.resources.map(resource => {
                  const type = resource.type === 'youtube' || resource.type === 'article' || 
                               resource.type === 'course' || resource.type === 'documentation' 
                               ? resource.type 
                               : 'article'; // default type
                  return {
                    ...resource,
                    type
                  };
                })
              }));
              
              const personalizedRoadmap: PersonalizedRoadmap = {
                id: roadmap.id,
                role: roadmap.role,
                weeks: weeks,
                totalWeeks: roadmap.weeks.length,
                totalHours: roadmap.weeks.reduce((sum, week) => sum + week.estimated_hours, 0),
                realityPanel: roadmap.realityPanel as RealityPanelData
              };
              
              return (
                <button
                  key={idx}
                  onClick={() => {
                    // Save current scroll position before navigating to detail view
                    if (roadmapListRef.current) {
                      scrollPositionRef.current = roadmapListRef.current.scrollTop;
                    }
                    setSelectedRoadmap(personalizedRoadmap);
                  }}
                  className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-left group"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition">
                      {roadmapIcons[roadmap.role] || <Code size={24} />}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg flex-1">{roadmap.role}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{roadmap.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {roadmap.weeks.length} weeks • {roadmap.weeks.reduce((sum, w) => sum + w.estimated_hours, 0)} hours
                    </p>
                    {completionPercentages[roadmap.id] !== undefined && completionPercentages[roadmap.id] > 0 && (
                      <div className="flex items-center gap-1 text-xs">
                        <CheckCircle size={14} className="text-green-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {completionPercentages[roadmap.id]}% complete
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};