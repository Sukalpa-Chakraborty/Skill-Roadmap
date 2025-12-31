const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T> {
  data: T;
  error?: string;
}

// User API
export const createUser = async (userData: { name: string; email: string; status: string; organization: string; hoursPerWeek: number; codingComfort: string; mathComfort: string; learningPatience: string; workType: string; jobPriority: string; timeAvailability: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Chat Messages API
export const saveChatMessage = async (messageData: { user_id: number; role: string; content: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};

export const getChatMessages = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat-messages/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

// Roadmaps API
export const saveRoadmap = async (roadmapData: { user_id: number; title: string; content: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmaps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roadmapData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving roadmap:', error);
    throw error;
  }
};

export const getRoadmaps = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/roadmaps/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    throw error;
  }
};

// Portfolios API
export const savePortfolio = async (portfolioData: { user_id: number; title: string; content: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(portfolioData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving portfolio:', error);
    throw error;
  }
};

export const getPortfolios = async (userId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolios/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    throw error;
  }
};