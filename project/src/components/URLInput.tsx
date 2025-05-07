import React, { useState, useEffect } from 'react';
import { isValidUrl } from '../utils/validation';

interface URLInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  onGenerate: () => void;
  isValid: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({ 
  value, 
  onChange, 
  onGenerate,
  isValid
}) => {
  const [touched, setTouched] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const valid = isValidUrl(newValue);
    onChange(newValue, valid);
    setTouched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      onGenerate();
    }
  };

  useEffect(() => {
    // Auto-validate initial URL if provided
    if (value && !touched) {
      onChange(value, isValidUrl(value));
    }
  }, [value, onChange, touched]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-1">
          Website URL
        </label>
        <div className="relative">
          <input
            id="url-input"
            type="text"
            className={`w-full px-4 py-2 border ${
              touched && !isValid ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
              'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } rounded-md shadow-sm transition duration-200`}
            placeholder="https://example.com"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="url"
          />
        </div>
        {touched && !isValid && value && (
          <p className="mt-1 text-sm text-red-600">
            Please enter a valid URL (e.g., https://example.com)
          </p>
        )}
      </div>
      
      <button
        className={`w-full py-2 px-4 rounded-md font-medium text-white transition-all duration-200 ${
          isValid
            ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg'
            : 'bg-blue-300 cursor-not-allowed'
        }`}
        onClick={onGenerate}
        disabled={!isValid}
      >
        Generate QR Code
      </button>
    </div>
  );
};