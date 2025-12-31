import React from 'react';
import { RealityPanelData } from '../types';

interface RealityPanelProps {
  realityPanel: RealityPanelData;
  role?: string;
}

export const RealityPanel: React.FC<RealityPanelProps> = ({ realityPanel }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
      <h3 className="font-bold text-red-800 dark:text-red-200 mb-3 flex items-center">
        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
        Reality Check
      </h3>
      
      <div className="space-y-3">
        <div>
          <div className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Coding Intensity</div>
          <div className="text-sm text-gray-800 dark:text-gray-200">{realityPanel.codingIntensity}</div>
        </div>
        
        <div>
          <div className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Math Dependency</div>
          <div className="text-sm text-gray-800 dark:text-gray-200">{realityPanel.mathDependency}</div>
        </div>
        
        <div>
          <div className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Time to First Job</div>
          <div className="text-sm text-gray-800 dark:text-gray-200">{realityPanel.timeToFirstJob}</div>
        </div>
        
        <div>
          <div className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Fresher Saturation (India)</div>
          <div className="text-sm text-gray-800 dark:text-gray-200">{realityPanel.fresherSaturation}</div>
        </div>
        
        <div>
          <div className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Learning Curve</div>
          <div className="text-sm text-gray-800 dark:text-gray-200">{realityPanel.learningCurve}</div>
        </div>
        
        <div>
          <div className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">Why People Fail in This Path</div>
          <ul className="mt-1 space-y-1">
            {realityPanel.failureReasons.map((reason, idx) => (
              <li key={idx} className="text-sm text-gray-800 dark:text-gray-200 flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      

    </div>
  );
};