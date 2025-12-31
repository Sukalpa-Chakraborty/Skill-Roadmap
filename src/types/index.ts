export type CodingComfort = 'Hate' | 'Neutral' | 'Love';
export type UserStatus = 'Student';
export type Background = 'CS' | 'Non-CS';

// Survey data types
export type EducationLevel = '1st year' | '2nd year' | '3rd year' | '4th year / Final year' | 'Graduated';
export type CollegeTier = 'Tier-1' | 'Tier-2' | 'Tier-3' | 'Don't know / Prefer not to say';
export type FieldInterest = 'Web Development' | 'Data / Analytics' | 'Cloud / Infra' | 'AI / ML' | 'Cyber Security' | 'Product / Management' | 'Design / UX' | 'Any other field' | 'Not sure yet';
export type MathComfort = 'Comfortable' | 'Average' | 'Weak' | 'Avoid it';
export type CareerGoalPriority = 'High salary' | 'Job security' | 'Quick placement' | 'Long-term growth' | 'Remote work';
export type PlacementTimeline = 'Within 6 months' | '6–12 months' | '1–2 years' | 'No fixed timeline';
export type ProjectExperience = 'No projects yet' | 'Open Source contribution' | 'Built small self projects' | 'Internship / real-world project';
export type LearningStyle = 'Step-by-step guidance' | 'Trial and error' | 'Videos' | 'Reading / docs';

export interface SurveyData {
  educationLevel: EducationLevel;
  collegeTier: CollegeTier;
  fieldInterests: FieldInterest[]; // Up to 3 selections
  codingComfort: CodingComfort;
  mathComfort: MathComfort;
  careerGoalPriorities: CareerGoalPriority[]; // Multiple selections allowed
  placementTimeline: PlacementTimeline;
  toolsUsed: string;
  projectExperience: ProjectExperience;
  learningStyle: LearningStyle;
}

export interface UserProfile {
  name: string;
  status: UserStatus;
  organization: string;
  hoursPerWeek: number;
  background: Background;
  surveyData?: SurveyData;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface CareerRecommendation {
  name: string;
  justification: string;
}

export interface Resource {
  type: 'youtube' | 'article' | 'course' | 'documentation';
  title: string;
  url: string;
}

export interface MiniProject {
  title: string;
  description: string;
}

export interface RoadmapWeek {
  week_number: number;
  learning_goals: string[];
  estimated_hours: number;
  mini_project: MiniProject;
  resources: Resource[];
}

export interface RealityPanelData {
  codingIntensity: 'Low' | 'Medium' | 'High';
  mathDependency: 'Low' | 'Medium' | 'High';
  timeToFirstJob: string; // e.g., "6-12 months"
  fresherSaturation: 'Low' | 'Medium' | 'High';
  learningCurve: 'Low' | 'Medium' | 'High';
  failureReasons: string[];
}

export interface PrebuiltRoadmap {
  id: string;
  role: string;
  description: string;
  weeks: RoadmapWeek[];
  realityPanel: RealityPanelData;
}

export interface PersonalizedRoadmap {
  id?: string;
  role: string;
  weeks: RoadmapWeek[];
  totalWeeks: number;
  totalHours: number;
  realityPanel?: RealityPanelData;
}

export interface PortfolioProject {
  title: string;
  subtasks: string[];
  outcome: string;
}

export interface PortfolioData {
  projects: PortfolioProject[];
  readmeMarkdown: string;
  aboutMe: string;
  skills: string[];
}