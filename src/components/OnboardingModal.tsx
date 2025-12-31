import React, { useState } from 'react';
import { UserProfile, UserStatus, Background } from '../types';

interface OnboardingModalProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<UserStatus>('Student');
  const [organization, setOrganization] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [background, setBackground] = useState<Background>('CS');
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    if (!name.trim()) newErrors.push('Name is required');
    if (!organization.trim()) newErrors.push('College is required');
    if (hoursPerWeek < 1 || hoursPerWeek > 168) newErrors.push('Hours per week must be between 1 and 168');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const profile: UserProfile = {
        name: name.trim(),
        status,
        organization: organization.trim(),
        hoursPerWeek,
        background,
      };
      onComplete(profile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
          <p className="text-blue-100">Let's build your personalized learning roadmap</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              {errors.map((error, idx) => (
                <p key={idx} className="text-sm text-red-700">
                  • {error}
                </p>
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as UserStatus)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Student">Student</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g., MIT"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours per week: <span className="text-blue-600 font-bold">{hoursPerWeek}</span>
            </label>
            <input
              type="range"
              min="1"
              max="168"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1h</span>
              <span>168h</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
            <div className="space-y-2">
              {(['CS', 'Non-CS'] as Background[]).map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="background"
                    value={option}
                    checked={background === option}
                    onChange={(e) => setBackground(e.target.value as Background)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>



          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition mt-6"
          >
            Let's Get Started!
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            You can update your profile later anytime
          </p>
        </form>
      </div>
    </div>
  );
};