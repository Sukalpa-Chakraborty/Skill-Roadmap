import React from 'react';
import { X } from 'lucide-react';

interface ExploreMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExploreMoreModal: React.FC<ExploreMoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Explore More</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="text-gray-700 dark:text-gray-300 space-y-6">
            <p className="font-semibold">Check out what is going on in the market</p>
            
            <div>
              <p className="font-semibold">1. Roadmaps Likely to be OUT-PERFORMING in the Next 5 Years</p>
              <p>(high growth + industry demand)</p>
              <div className="ml-4 mt-1 space-y-1">
                <p>AI Engineer</p>
                <p>AI and Data Scientist</p>
                <p>Machine Learning Engineer</p>
                <p>MLOps Engineer</p>
                <p>AI Agents</p>
                <p>AI Red Teaming</p>
                <p>Data Engineer</p>
                <p>Cloud Engineer</p>
                <p>DevOps Engineer</p>
                <p>DevSecOps Engineer</p>
                <p>Cybersecurity Engineer</p>
                <p>Kubernetes</p>
                <p>Docker</p>
                <p>AWS</p>
                <p>Terraform</p>
                <p>System Design</p>
                <p>Software Architect</p>
              </div>
              <p>Why: AI + cloud + security + scale problems are exploding.</p>
            </div>
            
            <div>
              <p className="font-semibold">2. Roadmaps with HIGH DEMAND (Stable & Safe)</p>
              <p>(consistently needed across companies)</p>
              <div className="ml-4 mt-1 space-y-1">
                <p>Backend Developer</p>
                <p>Full Stack Developer</p>
                <p>Frontend Developer</p>
                <p>Data Analyst</p>
                <p>BI Analyst</p>
                <p>QA Engineer</p>
                <p>Linux</p>
                <p>Git and GitHub</p>
                <p>SQL</p>
                <p>PostgreSQL Specialist</p>
                <p>API Design</p>
                <p>Node.js</p>
                <p>Java</p>
                <p>Spring Boot</p>
                <p>React</p>
                <p>Next.js</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold">3. Roadmaps MOST AT RISK Due to AI</p>
              <p>(automation pressure, fewer entry-level roles)</p>
              <div className="ml-4 mt-1 space-y-1">
                <p>Basic Web Frontend (HTML, CSS only)</p>
                <p>PHP</p>
                <p>WordPress</p>
                <p>Technical Writer</p>
                <p>QA (manual-only)</p>
                <p>Code Review (basic level)</p>
                <p>Simple CRUD Backend roles</p>
              </div>
              <p>Important: Not "dead", but bar is higher now.</p>
            </div>
            
            <div>
              <p className="font-semibold">4. Roadmaps with HIGH FRESHER SALARY POTENTIAL</p>
              <p>(India context, Tier-3 realistic upper range)</p>
              <div className="ml-4 mt-1 space-y-1">
                <p>AI Engineer</p>
                <p>Machine Learning Engineer</p>
                <p>Data Engineer</p>
                <p>MLOps Engineer</p>
                <p>Cloud Engineer</p>
                <p>DevOps Engineer</p>
                <p>DevSecOps Engineer</p>
                <p>Cybersecurity Engineer</p>
                <p>Blockchain Developer</p>
                <p>Software Architect (rare but high)</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold">5. Roadmaps with LOWER FRESHER SALARY (Entry Level)</p>
              <p>(often service-based hiring)</p>
              <div className="ml-4 mt-1 space-y-1">
                <p>Web Frontend Developer</p>
                <p>Web Backend Developer</p>
                <p>Full Stack Developer</p>
                <p>QA Engineer</p>
                <p>Technical Writer</p>
                <p>WordPress Developer</p>
                <p>PHP Developer</p>
                <p>BI Analyst (entry level)</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold">6. ROADMAPS GOOD FOR NON-CODERS / LOW-CODING</p>
              <p>(this matters for your chatbot logic)</p>
              <div className="ml-4 mt-1 space-y-1">
                <p>Product Manager</p>
                <p>Engineering Manager</p>
                <p>UX Designer</p>
                <p>Developer Relations</p>
                <p>Technical Writer</p>
                <p>BI Analyst</p>
                <p>Data Analyst (basic tools)</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold">7. ROADMAPS HARD BUT FUTURE-PROOF</p>
              <p>(high learning curve, low competition)</p>
              <div className="ml-4 mt-1 space-y-1">
                <p>System Design</p>
                <p>Software Architect</p>
                <p>Rust</p>
                <p>Go</p>
                <p>Kubernetes</p>
                <p>AI Red Teaming</p>
                <p>Server Side Game Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};