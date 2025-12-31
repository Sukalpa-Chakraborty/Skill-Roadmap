import { PrebuiltRoadmap, Resource } from '../types';
import roadmapsData from '../data/prebuilt_roadmaps.json';

// Type guard to ensure our data matches the expected type
const roadmaps: PrebuiltRoadmap[] = roadmapsData as PrebuiltRoadmap[];

// Simple cache implementation
interface CacheEntry {
  data: any;
  timestamp: number;
}

const resourceCache: Map<string, CacheEntry> = new Map();
const cacheTimeout = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
function getCachedData(key: string): any | null {
  const entry = resourceCache.get(key);
  if (!entry) return null;
  
  // Check if cache has expired
  if (Date.now() - entry.timestamp > cacheTimeout) {
    resourceCache.delete(key);
    return null;
  }
  
  return entry.data;
}

// Helper function to set cached data
function setCachedData(key: string, data: any): void {
  resourceCache.set(key, {
    data,
    timestamp: Date.now()
  });
}

// Clear cache periodically
setInterval(() => {
  const now = Date.now();
  resourceCache.forEach((entry, key) => {
    if (now - entry.timestamp > cacheTimeout) {
      resourceCache.delete(key);
    }
  });
}, cacheTimeout);

/**
 * Get all resources from all roadmaps
 * @returns Array of all resources across all roadmaps
 */
export const getAllResources = (): Resource[] => {
  // Check cache first
  const cacheKey = 'allResources';
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  const allResources: Resource[] = [];
  
  roadmaps.forEach(roadmap => {
    roadmap.weeks.forEach(week => {
      week.resources.forEach(resource => {
        allResources.push(resource);
      });
    });
  });
  
  // Cache the result
  setCachedData(cacheKey, allResources);
  
  return allResources;
};

/**
 * Get resources by type
 * @param type - The type of resources to filter by
 * @returns Array of resources of the specified type
 */
export const getResourcesByType = (type: Resource['type']): Resource[] => {
  // Check cache first
  const cacheKey = `type_${type}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  const results = getAllResources().filter(resource => resource.type === type);
  
  // Cache the result
  setCachedData(cacheKey, results);
  
  return results;
};

/**
 * Search resources by keyword
 * @param keyword - The keyword to search for in resource titles
 * @returns Array of resources matching the keyword
 */
export const searchResources = (keyword: string): Resource[] => {
  // Check cache first
  const cacheKey = `search_${keyword}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  const lowerKeyword = keyword.toLowerCase();
  const results = getAllResources().filter(resource => 
    resource.title.toLowerCase().includes(lowerKeyword) || 
    resource.type.toLowerCase().includes(lowerKeyword)
  );
  
  // Cache the result
  setCachedData(cacheKey, results);
  
  return results;
};

/**
 * Get all unique resource types
 * @returns Array of unique resource types
 */
export const getResourceTypes = (): string[] => {
  // Check cache first
  const cacheKey = 'resourceTypes';
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  const types = new Set<string>();
  getAllResources().forEach(resource => {
    types.add(resource.type);
  });
  const result = Array.from(types);
  
  // Cache the result
  setCachedData(cacheKey, result);
  
  return result;
};

/**
 * Get resources organized by roadmap
 * @returns Object with roadmap roles as keys and their resources as values
 */
export const getResourcesByRoadmap = (): Record<string, Resource[]> => {
  // Check cache first
  const cacheKey = 'resourcesByRoadmap';
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  const roadmapResources: Record<string, Resource[]> = {};
  
  roadmaps.forEach(roadmap => {
    const resources: Resource[] = [];
    roadmap.weeks.forEach(week => {
      week.resources.forEach(resource => {
        resources.push(resource);
      });
    });
    roadmapResources[roadmap.role] = resources;
  });
  
  // Cache the result
  setCachedData(cacheKey, roadmapResources);
  
  return roadmapResources;
};

/**
 * Get a formatted string of all resources for use in chatbot prompts
 * @returns String representation of all resources
 */
export const getResourcesAsString = (): string => {
  // Check cache first
  const cacheKey = 'resourcesAsString';
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  let resourcesString = "Available Resources:\n";
  
  // Limit to first 100 resources to avoid overwhelming the prompt
  const allResources = getAllResources().slice(0, 100);
  
  // Group resources by type
  const resourcesByType: Record<string, Resource[]> = {};
  allResources.forEach(resource => {
    if (!resourcesByType[resource.type]) {
      resourcesByType[resource.type] = [];
    }
    resourcesByType[resource.type].push(resource);
  });
  
  // Format resources by type
  Object.entries(resourcesByType).forEach(([type, resources]) => {
    resourcesString += `\n${type.toUpperCase()} RESOURCES:\n`;
    resources.slice(0, 15).forEach((resource, index) => {
      resourcesString += `  ${index + 1}. ${resource.title} - ${resource.url}\n`;
    });
  });
  
  // Cache the result
  setCachedData(cacheKey, resourcesString);
  
  return resourcesString;
};

/**
 * Get a formatted string of resources for a specific topic
 * @param topic - The topic to get resources for
 * @returns String representation of resources for the topic
 */
export const getResourcesForTopicAsString = (topic: string): string => {
  // Check cache first
  const cacheKey = `topicAsString_${topic}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  const resources = getResourcesForTopic(topic);
  if (resources.length === 0) {
    // If no specific resources found, return a selection of general popular resources
    const popularResources = [
      {type: 'course', title: 'Complete Web Development Bootcamp', url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/'},
      {type: 'youtube', title: 'JavaScript Crash Course', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c'},
      {type: 'documentation', title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/'},
      {type: 'article', title: 'Tech Career Pathways', url: 'https://www.freecodecamp.org/news/tech-career-pathways/'},
      {type: 'course', title: 'Python for Beginners', url: 'https://www.coursera.org/learn/python'}
    ];
    
    let resourcesString = `No specific resources found for '${topic}'. Here are some popular learning resources:\n`;
    popularResources.forEach((resource, index) => {
      resourcesString += `${index + 1}. ${resource.type.toUpperCase()}: ${resource.title} - ${resource.url}\n`;
    });
    
    // Cache the result
    setCachedData(cacheKey, resourcesString);
    
    return resourcesString;
  }
  
  let resourcesString = `Resources for ${topic}:\n`;
  resources.slice(0, 15).forEach((resource, index) => {
    resourcesString += `${index + 1}. ${resource.type.toUpperCase()}: ${resource.title} - ${resource.url}\n`;
  });
  
  // Cache the result
  setCachedData(cacheKey, resourcesString);
  
  return resourcesString;
};
/**
 * Get resources relevant to a specific topic/role
 * @param topic - The topic or role to find resources for
 * @returns Array of relevant resources
 */
export const getAllRoadmapsInfo = (): string => {
  // Check cache first
  const cacheKey = 'allRoadmapsInfo';
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  let roadmapsInfo = `AVAILABLE ROADMAPS IN THIS SYSTEM:\n\n`;
  
  roadmaps.forEach(roadmap => {
    roadmapsInfo += `• ${roadmap.role}
  - Description: ${roadmap.description}
  - Focus Areas: ${roadmap.weeks.flatMap(week => week.learning_goals).slice(0, 3).join(', ')}
  - Weeks: ${roadmap.weeks.length}
  - Estimated Hours: ${roadmap.weeks.reduce((sum, week) => sum + week.estimated_hours, 0)}

`;
  });
  
  // Cache the result
  setCachedData(cacheKey, roadmapsInfo);
  
  return roadmapsInfo;
};

export const getResourcesForTopic = (topic: string): Resource[] => {
  // Check cache first
  const cacheKey = `topic_${topic}`;
  const cached = getCachedData(cacheKey);
  if (cached) {
    return cached;
  }
  
  const lowerTopic = topic.toLowerCase();
  
  // Find roadmaps that match the topic
  const relevantRoadmaps = roadmaps.filter(roadmap => 
    roadmap.role.toLowerCase().includes(lowerTopic) ||
    roadmap.description.toLowerCase().includes(lowerTopic)
  );
  
  // Extract resources from relevant roadmaps
  const resources: Resource[] = [];
  relevantRoadmaps.forEach(roadmap => {
    roadmap.weeks.forEach(week => {
      week.resources.forEach(resource => {
        resources.push(resource);
      });
    });
  });
  
  // Also search for resources that match the topic directly
  const directResources = searchResources(topic);
  
  // Combine and deduplicate resources
  const combinedResources = [...resources, ...directResources];
  const uniqueResources = Array.from(new Map(combinedResources.map(item => [item.url, item])).values());
  
  // Cache the result
  setCachedData(cacheKey, uniqueResources);
  
  return uniqueResources;
};



export default {
  getAllResources,
  getResourcesByType,
  searchResources,
  getResourceTypes,
  getResourcesByRoadmap,
  getResourcesAsString,
  getResourcesForTopic,
  getResourcesForTopicAsString,
  getAllRoadmapsInfo
};