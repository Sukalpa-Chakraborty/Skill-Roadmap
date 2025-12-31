import { storage } from './storage';

export interface ProgressData {
  [roadmapId: string]: {
    [weekNumber: number]: boolean;
  };
}

// Get progress data from storage
export const getProgressData = async (): Promise<ProgressData> => {
  try {
    const progress = await storage.getItem('roadmap-progress');
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error loading progress data:', error);
    return {};
  }
};

// Save progress data to storage
export const saveProgressData = async (progress: ProgressData): Promise<void> => {
  try {
    await storage.setItem('roadmap-progress', JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress data:', error);
  }
};

// Toggle week completion status
export const toggleWeekCompletion = async (
  roadmapId: string,
  weekNumber: number
): Promise<void> => {
  const progress = await getProgressData();
  
  if (!progress[roadmapId]) {
    progress[roadmapId] = {};
  }
  
  // Toggle the completion status
  progress[roadmapId][weekNumber] = !progress[roadmapId][weekNumber];
  
  await saveProgressData(progress);
};

// Check if a week is completed
export const isWeekCompleted = async (
  roadmapId: string,
  weekNumber: number
): Promise<boolean> => {
  const progress = await getProgressData();
  return progress[roadmapId]?.[weekNumber] || false;
};

// Get completion percentage for a roadmap
export const getRoadmapCompletionPercentage = async (
  roadmapId: string,
  totalWeeks: number
): Promise<number> => {
  if (totalWeeks === 0) return 0;
  
  const progress = await getProgressData();
  const completedWeeks = Object.values(progress[roadmapId] || {}).filter(
    completed => completed
  ).length;
  
  return Math.round((completedWeeks / totalWeeks) * 100);
};