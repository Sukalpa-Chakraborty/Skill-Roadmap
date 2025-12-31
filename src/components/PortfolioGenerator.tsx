import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Download, Loader, Eye } from 'lucide-react';
import { UserProfile, PersonalizedRoadmap, PortfolioData } from '../types';
import { storage } from '../utils/storage';

interface PortfolioGeneratorProps {
  profile: UserProfile;
  roadmap: PersonalizedRoadmap;
  onComplete: (portfolio: PortfolioData) => void;
  onBack?: () => void; // Add optional onBack prop
}

export const PortfolioGenerator: React.FC<PortfolioGeneratorProps> = ({
  profile,
  roadmap,
  onComplete,
  onBack, // Destructure the onBack prop
}) => {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'readme' | 'about'>('projects');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const generatePortfolio = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual portfolio generation logic
      console.log('Generating portfolio for:', profile, roadmap);
      // For now, we'll just log and not generate anything
    } catch (error) {
      console.error('Portfolio generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateHTML = (): string => {
    if (!portfolio) return '';

    const projectsHTML = portfolio.projects
      .map(
        (project) => `
      <div class="project">
        <h3>${project.title}</h3>
        <div class="subtasks">
          ${project.subtasks.map((task) => `<li>${task}</li>`).join('')}
        </div>
        <p class="outcome"><strong>Outcome:</strong> ${project.outcome}</p>
      </div>
    `
      )
      .join('');

    const skillsHTML = portfolio.skills.map((skill) => `<span class="skill">${skill}</span>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} - ${roadmap.role} Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
    header { background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); color: white; padding: 60px 20px; text-align: center; margin-bottom: 40px; border-radius: 8px; }
    header h1 { font-size: 2.5em; margin-bottom: 10px; }
    header p { font-size: 1.1em; opacity: 0.9; }
    h2 { color: #0066cc; font-size: 1.8em; margin-top: 40px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #0066cc; }
    h3 { color: #333; margin-top: 15px; margin-bottom: 10px; }
    .about { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; }
    .skill { background: #0066cc; color: white; padding: 8px 16px; border-radius: 20px; font-size: 0.9em; }
    .projects { margin-bottom: 30px; }
    .project { background: #f8f9fa; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #0066cc; }
    .subtasks { list-style: disc; margin-left: 20px; margin-top: 10px; }
    .subtasks li { margin-bottom: 5px; }
    .outcome { margin-top: 10px; color: #666; }
    footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${profile.name}</h1>
      <p>${roadmap.role} • ${profile.organization}</p>
    </header>

    <section class="about">
      <h2>About Me</h2>
      <p>${portfolio.aboutMe}</p>
      <div class="skills">
        <strong style="width: 100%; margin-bottom: 10px;">Skills:</strong>
        ${skillsHTML}
      </div>
    </section>

    <section class="projects">
      <h2>Featured Projects</h2>
      ${projectsHTML}
    </section>

    <footer>
      <p>Portfolio generated on ${new Date().toLocaleDateString()}</p>
    </footer>
  </div>
</body>
</html>`;
  };

  const downloadPortfolio = () => {
    const html = generateHTML();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
    element.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}_portfolio.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-6">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Generate Your Portfolio</h2>
          <p className="text-gray-600 mb-6">
            Create a professional portfolio showcasing projects, skills, and experience based on your {roadmap.role} roadmap.
          </p>
          <button
            onClick={generatePortfolio}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Portfolio'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {onBack && (
        <div className="border-b border-gray-200 p-3 bg-gray-50">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      )}
      
      <div className="border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}'s Portfolio</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Eye size={18} />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={downloadPortfolio}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Download size={18} />
              Download HTML
            </button>
          </div>
        </div>
      </div>

      {showPreview ? (
        <iframe
          srcDoc={generateHTML()}
          className="flex-1 border-none"
          title="Portfolio Preview"
        />
      ) : (
        <>
          <div className="flex border-b border-gray-200">
            {(['projects', 'readme', 'about'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 font-medium transition ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <button
                    onClick={() => handleCopy(JSON.stringify(portfolio.projects, null, 2), 'projects')}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition mb-4"
                  >
                    {copiedId === 'projects' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === 'projects' ? 'Copied' : 'Copy All'}
                  </button>
                  {portfolio.projects.map((project, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition">
                      <h3 className="font-bold text-gray-900 mb-3">{project.title}</h3>
                      <div className="mb-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Subtasks:</h4>
                        <ul className="space-y-1">
                          {project.subtasks.map((task, i) => (
                            <li key={i} className="text-sm text-gray-600 flex gap-2">
                              <span>•</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Outcome:</strong> {project.outcome}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'readme' && (
                <div>
                  <button
                    onClick={() => handleCopy(portfolio.readmeMarkdown, 'readme')}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition mb-4"
                  >
                    {copiedId === 'readme' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === 'readme' ? 'Copied' : 'Copy README'}
                  </button>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap break-words max-h-96 overflow-auto">
                    {portfolio.readmeMarkdown}
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div>
                  <button
                    onClick={() => handleCopy(portfolio.aboutMe, 'about')}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition mb-4"
                  >
                    {copiedId === 'about' ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === 'about' ? 'Copied' : 'Copy About'}
                  </button>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">About Me</h3>
                      <p className="text-gray-700 leading-relaxed">{portfolio.aboutMe}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {portfolio.skills.map((skill, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};