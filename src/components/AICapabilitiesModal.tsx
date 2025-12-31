import React from 'react';

interface AICapabilitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: string;
}

export const AICapabilitiesModal: React.FC<AICapabilitiesModalProps> = ({ isOpen, onClose, role }) => {
  if (!isOpen) return null;

  // AI content mapping for specific roles
  const getAIContent = (role: string) => {
    const aiContentMap: Record<string, string> = {
      'Cloud Engineer': `Cloud Engineer

AI can help you:

Generate and validate YAML (Kubernetes, CloudFormation, Terraform)

Troubleshoot cloud errors and logs faster

Suggest cost-optimization strategies

Write architecture diagrams and documentation

Translate requirements into cloud setups

AI will NOT:

Design production architecture alone

Handle outages or security decisions autonomously`,
      'DevOps Engineer': `DevOps Engineer

AI can help you:

Write CI/CD pipelines

Debug failed builds and deployments

Generate Dockerfiles and Kubernetes manifests

Optimize scripts and automation

Explain unfamiliar Linux commands

AI will NOT:

Own reliability or on-call decisions

Replace infrastructure ownership`,
      'DevSecOps Engineer': `DevSecOps Engineer

AI can help you:

Scan code and configs for vulnerabilities

Suggest secure pipeline practices

Generate security policies and compliance docs

Explain CVEs and threat reports

AI will NOT:

Approve security decisions

Handle incident response alone`,
      'Web Frontend Developer': `Web Frontend Developer

AI can help you:

Generate UI components

Fix layout and responsiveness issues

Improve accessibility

Optimize performance

Convert designs into code

AI will NOT:

Understand users better than designers

Replace UX thinking`,
      'Web Backend Developer': `Web Backend Developer

AI can help you:

Generate APIs and database schemas

Debug backend errors

Optimize queries

Write authentication logic

Generate tests

AI will NOT:

Design scalable systems independently

Make architecture trade-offs`,
      'Full Stack Developer': `Full Stack Developer

AI can help you:

Speed up feature development

Generate boilerplate code

Debug frontend and backend issues

Write deployment configs

Create documentation

AI will NOT:

Own system design

Replace engineering judgment`,
      'Data Analyst': `Data Analyst

AI can help you:

Clean and preprocess data

Write SQL queries

Generate dashboards

Explain trends

Automate reports

AI will NOT:

Define business context

Make strategic decisions`,
      'Data Engineer': `Data Engineer

AI can help you:

Build ETL pipelines

Optimize data flows

Debug pipeline failures

Write transformation logic

Generate documentation

AI will NOT:

Design data architecture independently

Handle production data risks`,
      'Machine Learning Engineer': `Machine Learning Engineer

AI can help you:

Speed up model prototyping

Tune hyperparameters

Debug training issues

Generate evaluation code

Write deployment scripts

AI will NOT:

Choose the right model blindly

Understand data biases automatically`,
      'AI Engineer': `AI Engineer

AI can help you:

Integrate AI models into apps

Build AI workflows

Optimize prompts

Debug AI responses

Deploy AI systems

AI will NOT:

Guarantee accuracy

Take responsibility for decisions`,
      'QA Engineer': `QA Engineer

AI can help you:

Generate test cases

Write automation scripts

Identify edge cases

Analyze test results

Speed up regression testing

AI will NOT:

Replace human judgment

Understand business impact fully`,
      'Mobile Developer (Android / iOS)': `Mobile Developer (Android / iOS)

AI can help you:

Generate UI components

Debug crashes

Optimize performance

Write API integration code

Handle edge cases

AI will NOT:

Replace app design decisions

Ensure store compliance`,
      'Cybersecurity Engineer': `Cybersecurity Engineer

AI can help you:

Analyze logs

Detect anomalies

Explain attack patterns

Automate threat reports

Assist in pentesting

AI will NOT:

Make security decisions

Handle live attacks autonomously`,
      'Software Architect': `Software Architect

AI can help you:

Draft architecture diagrams

Compare design patterns

Evaluate trade-offs

Generate documentation

Review designs

AI will NOT:

Own system responsibility

Predict real-world failures`,
      'UX Designer': `UX Designer

AI can help you:

Generate wireframes

Summarize user research

Suggest UI improvements

Create design documentation

Speed up ideation

AI will NOT:

Replace user empathy

Make final design decisions`,
      'Technical Writer': `Technical Writer

AI can help you:

Draft documentation

Simplify complex topics

Maintain consistency

Generate API docs

Improve clarity

AI will NOT:

Understand product intent fully

Replace human review`,
      'Game Developer': `Game Developer

AI can help you:

Generate game logic

Design levels

Optimize performance

Write AI behavior scripts

Debug gameplay issues

AI will NOT:

Design fun gameplay

Replace creativity`,
      'Server-Side Game Developer': `Server-Side Game Developer

AI can help you:

Design multiplayer logic

Debug server issues

Optimize networking

Handle matchmaking logic

Write backend scripts

AI will NOT:

Guarantee scalability

Manage live servers`,
      'MLOps Engineer': `MLOps Engineer

AI can help you:

Automate ML pipelines

Monitor models

Debug deployments

Optimize workflows

Generate infra configs

AI will NOT:

Decide production rollbacks

Handle failures autonomously`,
      'Product Manager': `Product Manager

AI can help you:

Write PRDs

Analyze feedback

Generate roadmaps

Summarize metrics

Speed up research

AI will NOT:

Define product vision

Make final decisions`,
      'Engineering Manager': `Engineering Manager

AI can help you:

Analyze team metrics

Draft planning docs

Summarize meetings

Improve processes

Forecast risks

AI will NOT:

Manage people

Lead teams`,
      'Developer Relations': `Developer Relations

AI can help you:

Create tutorials

Draft blogs

Answer FAQs

Analyze community feedback

Improve engagement

AI will NOT:

Build trust

Replace human interaction`,
      'BI Analyst': `BI Analyst

AI can help you:

Build dashboards

Analyze trends

Generate reports

Write queries

Explain KPIs

AI will NOT:

Decide business strategy

Replace domain expertise`,
    };
    return aiContentMap[role] || '';
  };

  const aiContent = getAIContent(role);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out scale-95 animate-fadeInUp">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">AI Capabilities for {role}</h1>
          </div>
        </div>

        <div className="p-6">
          <pre className="whitespace-pre-wrap font-normal text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            {aiContent.trim()}
          </pre>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};