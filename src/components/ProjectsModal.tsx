import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadmapRole: string;
}

const projectContent: Record<string, string> = {
  'Cloud Engineer': `
1. Cloud Engineer

Easy:

Cloud Static Website – Host a static website using cloud storage and CDN.

Medium:

3-Tier Cloud Application – Deploy frontend, backend, and database on cloud VMs.

Hard:

Highly Available Cloud System – Auto-scaling, load balancing, monitoring, and backup.
  `,

  'DevOps Engineer': `
2. DevOps Engineer

Easy:

Basic CI Pipeline – Automated build and test pipeline for a sample app.

Medium:

CI/CD with Docker – Containerized app with automated deployment.

Hard:

DevOps Automation Platform – CI/CD + Kubernetes + monitoring stack.
  `,

  'DevSecOps Engineer': `
3. DevSecOps Engineer

Easy:

Security Scan in CI – Add vulnerability scanning in CI pipeline.

Medium:

Secure CI/CD Pipeline – Secrets management, code scanning, container security.

Hard:

Shift-Left Security Platform – End-to-end secure DevOps workflow.
  `,

  'Web Frontend Developer': `
4. Web Frontend Developer

Easy:

Responsive Website – Multi-page responsive UI.

Medium:

Interactive Web App – API integration and state management.

Hard:

Production-Grade Frontend – Performance optimization, accessibility, SSR.
  `,

  'Web Backend Developer': `
5. Web Backend Developer

Easy:

REST API Service – CRUD APIs with database.

Medium:

Auth-Based Backend – Authentication, authorization, role management.

Hard:

Scalable Backend System – Caching, rate limiting, microservices.
  `,

  'Full Stack Developer': `
6. Full Stack Developer

Easy:

Full Stack CRUD App – Frontend + backend + database.

Medium:

User-Driven Platform – Auth, dashboards, real-time updates.

Hard:

Scalable Full Stack System – Microservices, cloud deployment.
  `,

  'Data Analyst': `
7. Data Analyst

Easy:

Data Cleaning & Charts – Analyze dataset and create visual reports.

Medium:

Business Dashboard – SQL + visualization tools.

Hard:

Decision-Making Analytics System – Data pipeline + insights + KPIs.
  `,

  'Data Engineer': `
8. Data Engineer

Easy:

ETL Pipeline – Extract, transform, load data.

Medium:

Data Warehouse System – Structured storage for analytics.

Hard:

Scalable Data Platform – Streaming + batch pipelines.
  `,

  'Machine Learning Engineer': `
9. Machine Learning Engineer

Easy:

ML Model Training – Train and evaluate a model.

Medium:

ML-Powered Application – Model served via API.

Hard:

Production ML System – Monitoring, retraining, deployment.
  `,

  'AI Engineer': `
10. AI Engineer

Easy:

AI Feature Prototype – Use pre-trained models for tasks.

Medium:

AI-Driven Application – AI integrated into real workflow.

Hard:

End-to-End AI System – Custom models + deployment + optimization.
  `,

  'AI and Data Scientist': `
11. AI & Data Scientist

Easy:

Exploratory Data Analysis – Insights from real datasets.

Medium:

Predictive Analytics Project – Statistical + ML models.

Hard:

Business-Impact AI Solution – End-to-end data-driven system.
  `,

  'QA Engineer': `
12. QA Engineer

Easy:

Manual Testing Suite – Test cases and bug reports.

Medium:

Automation Testing – Automated UI/API tests.

Hard:

Quality Engineering System – CI-integrated automation and reports.
  `,

  'Mobile Developer': `
13. Mobile Developer

Easy:

Basic Mobile App – Simple UI and navigation.

Medium:

API-Integrated App – Backend integration and state handling.

Hard:

Production Mobile App – Performance, security, deployment.
  `,

  'Android Developer': `
14. Android Developer

Easy:

Android Utility App – Simple Android application.

Medium:

Android App with Backend – Firebase/API integration.

Hard:

Scalable Android App – Offline support, performance tuning.
  `,

  'iOS Developer': `
15. iOS Developer

Easy:

Basic iOS App – Swift UI application.

Medium:

API-Driven iOS App – Networking and data persistence.

Hard:

Production iOS App – Architecture, performance, App Store readiness.
  `,

  'Cybersecurity Engineer': `
16. Cybersecurity Engineer

Easy:

Security Assessment – Identify vulnerabilities in a system.

Medium:

Secure Application Design – Implement security controls.

Hard:

Threat Detection System – Monitoring and incident response simulation.
  `,

  'Software Architect': `
17. Software Architect

Easy:

System Design Case Study – Architecture diagrams for an app.

Medium:

Scalable System Blueprint – High-level design for scale.

Hard:

Enterprise Architecture Design – Distributed, fault-tolerant system.
  `,

  'UX Designer': `
18. UX Designer

Easy:

UI Redesign Project – Improve existing interface.

Medium:

UX Case Study – Research, wireframes, prototype.

Hard:

Design System – Reusable components and guidelines.
  `,

  'Technical Writer': `
19. Technical Writer

Easy:

User Documentation – Guides and FAQs.

Medium:

Developer Documentation – API and technical docs.

Hard:

Documentation Platform – Structured docs with versioning.
  `,

  'Game Developer': `
20. Game Developer

Easy:

2D Game – Basic gameplay mechanics.

Medium:

Feature-Rich Game – Levels, scoring, assets.

Hard:

Commercial-Grade Game – Optimization, deployment.
  `,

  'Server Side Game Developer': `
21. Server-Side Game Developer

Easy:

Game Backend API – Player data and matchmaking.

Medium:

Multiplayer Server – Real-time communication.

Hard:

Scalable Game Backend – High concurrency and reliability.
  `,

  'MLOps Engineer': `
22. MLOps Engineer

Easy:

Model Deployment – Serve ML model.

Medium:

Automated ML Pipeline – Training and deployment automation.

Hard:

End-to-End MLOps Platform – Monitoring, rollback, scaling.
  `,

  'Product Manager': `
23. Product Manager

Easy:

Problem & User Research – Identify pain points.

Medium:

Product Roadmap & PRD – Features and timelines.

Hard:

Data-Driven Product Strategy – Metrics-based decisions.
  `,

  'Engineering Manager': `
24. Engineering Manager

Easy:

Team Planning Framework – Sprint and workload planning.

Medium:

Engineering Process Design – Dev workflows and KPIs.

Hard:

Org-Scale Engineering Strategy – Scaling teams and systems.
  `,

  'Developer Relations': `
25. Developer Relations

Easy:

Community Content – Blogs, tutorials.

Medium:

Developer Advocacy Program – Events and engagement.

Hard:

DevRel Platform – Docs, SDKs, feedback loop.
  `,

  'BI Analyst': `
26. BI Analyst

Easy:

Business Reports – Static dashboards.

Medium:

Interactive BI Dashboard – Filters and KPIs.

Hard:

Enterprise BI System – Data modeling and insights.
  `
};

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose, roadmapRole }) => {
  const content = projectContent[roadmapRole] || `No projects available for ${roadmapRole}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out" onClick={onClose}>
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Project Ideas for {roadmapRole}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};