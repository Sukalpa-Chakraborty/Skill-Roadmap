import React, { useState } from 'react';
import { 
  SurveyData, 
  EducationLevel, 
  CollegeTier, 
  FieldInterest, 
  MathComfort, 
  CareerGoalPriority, 
  PlacementTimeline, 
  ProjectExperience, 
  LearningStyle 
} from '../types';

interface SurveyModalProps {
  onComplete: (surveyData: SurveyData) => void;
  onCancel?: () => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({ onComplete, onCancel }) => {
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('1st year');
  const [collegeTier, setCollegeTier] = useState<CollegeTier>('Tier-1');
  const [fieldInterests, setFieldInterests] = useState<FieldInterest[]>([]);
  const [mathComfort, setMathComfort] = useState<MathComfort>('Average');
  const [careerGoalPriorities, setCareerGoalPriorities] = useState<CareerGoalPriority[]>([]);
  const [placementTimeline, setPlacementTimeline] = useState<PlacementTimeline>('Within 6 months');
  const [toolsUsed, setToolsUsed] = useState('');
  const [projectExperience, setProjectExperience] = useState<ProjectExperience>('No projects yet');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('Step-by-step guidance');
  const [codingComfort, setCodingComfort] = useState<'Love' | 'Neutral' | 'Hate'>('Neutral');

  const handleFieldInterestChange = (interest: FieldInterest) => {
    if (fieldInterests.includes(interest)) {
      setFieldInterests(fieldInterests.filter(i => i !== interest));
    } else if (fieldInterests.length < 3) {
      setFieldInterests([...fieldInterests, interest]);
    }
  };

  const handleCareerGoalPriorityChange = (priority: CareerGoalPriority) => {
    if (careerGoalPriorities.includes(priority)) {
      setCareerGoalPriorities(careerGoalPriorities.filter(p => p !== priority));
    } else {
      setCareerGoalPriorities([...careerGoalPriorities, priority]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const surveyData: SurveyData = {
      educationLevel,
      collegeTier,
      fieldInterests,
      codingComfort,
      mathComfort,
      careerGoalPriorities,
      placementTimeline,
      toolsUsed,
      projectExperience,
      learningStyle
    };
    
    onComplete(surveyData);
  };

  const educationLevelOptions: EducationLevel[] = [
    '1st year',
    '2nd year',
    '3rd year',
    '4th year / Final year',
    'Graduated'
  ];

  const collegeTierOptions: CollegeTier[] = [
    'Tier-1',
    'Tier-2',
    'Tier-3',
    'Don\'t know / Prefer not to say'
  ];

  const fieldInterestOptions: FieldInterest[] = [
    'Web Development',
    'Data / Analytics',
    'Cloud / Infra',
    'AI / ML',
    'Cyber Security',
    'Product / Management',
    'Design / UX',
    'Any other field',
    'Not sure yet'
  ];

  const mathComfortOptions: MathComfort[] = [
    'Comfortable',
    'Average',
    'Weak',
    'Avoid it'
  ];

  const careerGoalPriorityOptions: CareerGoalPriority[] = [
    'High salary',
    'Job security',
    'Quick placement',
    'Long-term growth',
    'Remote work'
  ];

  const placementTimelineOptions: PlacementTimeline[] = [
    'Within 6 months',
    '6–12 months',
    '1–2 years',
    'No fixed timeline'
  ];

  const projectExperienceOptions: ProjectExperience[] = [
    'No projects yet',
    'Open Source contribution',
    'Built small self projects',
    'Internship / real-world project'
  ];

  const learningStyleOptions: LearningStyle[] = [
    'Step-by-step guidance',
    'Trial and error',
    'Videos',
    'Reading / docs'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <h1 className="text-2xl font-bold">Help us to know more about you</h1>
          <p className="text-blue-100 text-sm">This information helps us personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Q1: Education Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q1. Current Education Level
            </label>
            <p className="text-sm text-gray-500 mb-3">Which year are you currently in?</p>
            <div className="space-y-2">
              {educationLevelOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="educationLevel"
                    value={option}
                    checked={educationLevel === option}
                    onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q2: College Tier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q2. College Tier
            </label>
            <p className="text-sm text-gray-500 mb-3">Which category best fits your college?</p>
            <div className="space-y-2">
              {collegeTierOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="collegeTier"
                    value={option}
                    checked={collegeTier === option}
                    onChange={(e) => setCollegeTier(e.target.value as CollegeTier)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q3: Field Interest */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q3. Field Interest
            </label>
            <p className="text-sm text-gray-500 mb-3">Which areas interest you most? (select up to 3)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fieldInterestOptions.map((option) => (
                <label key={option} className={`flex items-center p-2 rounded border ${
                  fieldInterests.includes(option) 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}>
                  <input
                    type="checkbox"
                    checked={fieldInterests.includes(option)}
                    onChange={() => handleFieldInterestChange(option)}
                    disabled={!fieldInterests.includes(option) && fieldInterests.length >= 3}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {fieldInterests.length >= 3 && (
              <p className="text-xs text-gray-500 mt-1">Maximum 3 selections reached</p>
            )}
          </div>

          {/* Q4: Coding Comfort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q4. Coding Comfort
            </label>
            <p className="text-sm text-gray-500 mb-3">How do you feel about coding?</p>
            <div className="space-y-2">
              {(['Love', 'Neutral', 'Hate'] as const).map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="codingComfort"
                    value={option}
                    checked={codingComfort === option}
                    onChange={(e) => setCodingComfort(e.target.value as 'Love' | 'Neutral' | 'Hate')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option === 'Love' ? 'I enjoy it' : option === 'Neutral' ? 'I can tolerate it' : 'I hate it'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q5: Math Comfort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q5. Math Comfort
            </label>
            <p className="text-sm text-gray-500 mb-3">How comfortable are you with math?</p>
            <div className="space-y-2">
              {mathComfortOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="mathComfort"
                    value={option}
                    checked={mathComfort === option}
                    onChange={(e) => setMathComfort(e.target.value as MathComfort)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q6: Career Goal Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q6. Career Goal Priority
            </label>
            <p className="text-sm text-gray-500 mb-3">What matters most to you right now? (select all that apply)</p>
            <div className="space-y-2">
              {careerGoalPriorityOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={careerGoalPriorities.includes(option)}
                    onChange={() => handleCareerGoalPriorityChange(option)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q7: Placement Timeline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q7. Placement Timeline
            </label>
            <p className="text-sm text-gray-500 mb-3">When do you want your first job?</p>
            <div className="space-y-2">
              {placementTimelineOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="placementTimeline"
                    value={option}
                    checked={placementTimeline === option}
                    onChange={(e) => setPlacementTimeline(e.target.value as PlacementTimeline)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q8: Tools Used */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q8. Tell us the tools that You've Used (even basics) write it down below:
            </label>
            <textarea
              value={toolsUsed}
              onChange={(e) => setToolsUsed(e.target.value)}
              placeholder="List the tools you've used..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={toolsUsed === ''}
                  onChange={(e) => setToolsUsed(e.target.checked ? '' : toolsUsed)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">None</span>
              </label>
            </div>
          </div>

          {/* Q9: Project Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q9. Project Experience
            </label>
            <p className="text-sm text-gray-500 mb-3">Have you built anything?</p>
            <div className="space-y-2">
              {projectExperienceOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="projectExperience"
                    value={option}
                    checked={projectExperience === option}
                    onChange={(e) => setProjectExperience(e.target.value as ProjectExperience)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Q10: Learning Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Q10. Learning Style
            </label>
            <p className="text-sm text-gray-500 mb-3">How do you learn best?</p>
            <div className="space-y-2">
              {learningStyleOptions.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="learningStyle"
                    value={option}
                    checked={learningStyle === option}
                    onChange={(e) => setLearningStyle(e.target.value as LearningStyle)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};