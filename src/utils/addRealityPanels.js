import fs from 'fs';

// Read the existing roadmap data
const roadmapData = JSON.parse(fs.readFileSync('../data/prebuilt_roadmaps.json', 'utf8'));

// Reality panel data for different roadmap categories
const realityPanelTemplates = {
  // High coding intensity roles
  highCoding: {
    codingIntensity: "High",
    mathDependency: "Low",
    timeToFirstJob: "4-8 months",
    fresherSaturation: "High",
    learningCurve: "Medium",
    failureReasons: [
      "Inability to solve complex coding problems under time pressure",
      "Lack of understanding of data structures and algorithms",
      "Insufficient practice with real-world projects"
    ]
  },
  
  // Medium coding intensity roles
  mediumCoding: {
    codingIntensity: "Medium",
    mathDependency: "Low",
    timeToFirstJob: "6-12 months",
    fresherSaturation: "Medium",
    learningCurve: "Medium",
    failureReasons: [
      "Lack of hands-on experience with required technologies",
      "Over-reliance on theoretical knowledge without practical implementation",
      "Not building a strong portfolio of projects"
    ]
  },
  
  // Low coding intensity roles
  lowCoding: {
    codingIntensity: "Low",
    mathDependency: "Low",
    timeToFirstJob: "3-6 months",
    fresherSaturation: "High",
    learningCurve: "Low",
    failureReasons: [
      "Lack of understanding of fundamental concepts",
      "Inability to communicate technical ideas effectively",
      "Poor documentation and presentation skills"
    ]
  },
  
  // High math dependency roles
  highMath: {
    codingIntensity: "High",
    mathDependency: "High",
    timeToFirstJob: "12-18 months",
    fresherSaturation: "Low",
    learningCurve: "High",
    failureReasons: [
      "Insufficient mathematical foundation for machine learning",
      "Difficulty in understanding complex algorithms and statistics",
      "Lack of research and analytical thinking skills"
    ]
  },
  
  // Medium math dependency roles
  mediumMath: {
    codingIntensity: "Medium",
    mathDependency: "Medium",
    timeToFirstJob: "8-14 months",
    fresherSaturation: "Medium",
    learningCurve: "Medium",
    failureReasons: [
      "Inadequate understanding of statistical concepts",
      "Difficulty in applying mathematical concepts to real problems",
      "Lack of practice with data analysis techniques"
    ]
  },
  
  // DevOps/Infrastructure roles
  devOps: {
    codingIntensity: "High",
    mathDependency: "Low",
    timeToFirstJob: "8-14 months",
    fresherSaturation: "Medium",
    learningCurve: "High",
    failureReasons: [
      "Insufficient scripting and automation skills",
      "Lack of understanding of CI/CD pipelines and infrastructure as code",
      "Difficulty in troubleshooting complex system issues"
    ]
  },
  
  // Design/UI/UX roles
  design: {
    codingIntensity: "Low",
    mathDependency: "Low",
    timeToFirstJob: "4-8 months",
    fresherSaturation: "High",
    learningCurve: "Medium",
    failureReasons: [
      "Lack of creativity and design sense",
      "Inability to create user-centered designs",
      "Poor portfolio showcasing design skills"
    ]
  },
  
  // Management/Leadership roles
  management: {
    codingIntensity: "Low",
    mathDependency: "Low",
    timeToFirstJob: "12-24 months",
    fresherSaturation: "Low",
    learningCurve: "High",
    failureReasons: [
      "Lack of leadership and communication skills",
      "Inability to manage teams and projects effectively",
      "Insufficient understanding of business and strategy"
    ]
  },
  
  // Security roles
  security: {
    codingIntensity: "Medium",
    mathDependency: "Low",
    timeToFirstJob: "10-16 months",
    fresherSaturation: "Low",
    learningCurve: "High",
    failureReasons: [
      "Insufficient understanding of security principles and practices",
      "Lack of hands-on experience with security tools",
      "Difficulty in thinking like an attacker"
    ]
  },
  
  // Data roles
  data: {
    codingIntensity: "Medium",
    mathDependency: "High",
    timeToFirstJob: "8-14 months",
    fresherSaturation: "Medium",
    learningCurve: "High",
    failureReasons: [
      "Inadequate statistical and mathematical knowledge",
      "Difficulty in extracting insights from complex data",
      "Lack of experience with data visualization tools"
    ]
  }
};

// Mapping of roadmap IDs to their reality panel templates
const roadmapToTemplate = {
  // High coding intensity
  "web-frontend": realityPanelTemplates.highCoding,
  "web-backend": realityPanelTemplates.highCoding,
  "full-stack-developer": realityPanelTemplates.highCoding,
  "android-developer": realityPanelTemplates.highCoding,
  "ios-developer": realityPanelTemplates.highCoding,
  "react": realityPanelTemplates.highCoding,
  "vue": realityPanelTemplates.highCoding,
  "angular": realityPanelTemplates.highCoding,
  "javascript": realityPanelTemplates.highCoding,
  "typescript": realityPanelTemplates.highCoding,
  "nodejs": realityPanelTemplates.highCoding,
  "python": realityPanelTemplates.highCoding,
  "java": realityPanelTemplates.highCoding,
  "aspnet-core": realityPanelTemplates.highCoding,
  "spring-boot": realityPanelTemplates.highCoding,
  "flutter": realityPanelTemplates.highCoding,
  "cpp": realityPanelTemplates.highCoding,
  "rust": realityPanelTemplates.highCoding,
  "go": realityPanelTemplates.highCoding,
  "react-native": realityPanelTemplates.highCoding,
  "dsa": realityPanelTemplates.highCoding,
  "php": realityPanelTemplates.highCoding,
  "kotlin": realityPanelTemplates.highCoding,
  "html": realityPanelTemplates.highCoding,
  "css": realityPanelTemplates.highCoding,
  "swift-swiftui": realityPanelTemplates.highCoding,
  "laravel": realityPanelTemplates.highCoding,
  
  // Medium coding intensity
  "cloud-engineer": realityPanelTemplates.mediumCoding,
  "devops-engineer": realityPanelTemplates.devOps,
  "ml-engineer": realityPanelTemplates.highMath,
  "qa-engineer": realityPanelTemplates.mediumCoding,
  "mobile-developer": realityPanelTemplates.mediumCoding,
  "postgresql-specialist": realityPanelTemplates.mediumCoding,
  "blockchain-developer": realityPanelTemplates.mediumCoding,
  "software-architect": realityPanelTemplates.mediumCoding,
  "server-side-game-developer": realityPanelTemplates.mediumCoding,
  "mlops-engineer": realityPanelTemplates.mediumCoding,
  "system-design": realityPanelTemplates.mediumCoding,
  "api-design": realityPanelTemplates.mediumCoding,
  "design-system": realityPanelTemplates.mediumCoding,
  "mongodb": realityPanelTemplates.mediumCoding,
  "redis": realityPanelTemplates.mediumCoding,
  "elasticsearch": realityPanelTemplates.mediumCoding,
  
  // Low coding intensity
  "product-manager": realityPanelTemplates.management,
  "ux-designer": realityPanelTemplates.design,
  "technical-writer": realityPanelTemplates.lowCoding,
  "game-developer": realityPanelTemplates.mediumCoding,
  "engineering-manager": realityPanelTemplates.management,
  "developer-relations": realityPanelTemplates.lowCoding,
  "bi-analyst": realityPanelTemplates.data,
  "sql": realityPanelTemplates.lowCoding,
  "computer-science": realityPanelTemplates.mediumCoding,
  "shell-bash": realityPanelTemplates.lowCoding,
  "wordpress": realityPanelTemplates.lowCoding,
  
  // High math dependency
  "ai-engineer": realityPanelTemplates.highMath,
  "ai-data-scientist": realityPanelTemplates.highMath,
  "data-engineer": realityPanelTemplates.data,
  "data-analyst": realityPanelTemplates.data,
  
  // Security
  "cybersecurity": realityPanelTemplates.security,
  "devsecops-engineer": realityPanelTemplates.security,
  
  // Special cases
  "linux": realityPanelTemplates.devOps,
  "kubernetes": realityPanelTemplates.devOps,
  "docker": realityPanelTemplates.devOps,
  "aws": realityPanelTemplates.devOps,
  "terraform": realityPanelTemplates.devOps,
  "git-github": realityPanelTemplates.lowCoding,
  "cloudflare": realityPanelTemplates.devOps,
  "ai-red-teaming": realityPanelTemplates.security,
  "ai-agents": realityPanelTemplates.highMath,
  "nextjs": realityPanelTemplates.highCoding,
  "code-review": realityPanelTemplates.lowCoding,
  "prompt-engineering": realityPanelTemplates.lowCoding,
  "new": realityPanelTemplates.lowCoding
};

// Add reality panel data to each roadmap
roadmapData.forEach(roadmap => {
  if (!roadmap.realityPanel) {
    const template = roadmapToTemplate[roadmap.id] || realityPanelTemplates.mediumCoding;
    roadmap.realityPanel = template;
  }
});

// Write the updated data back to the file
fs.writeFileSync('../data/prebuilt_roadmaps.json', JSON.stringify(roadmapData, null, 2));
console.log('Reality panel data added to all roadmaps!');