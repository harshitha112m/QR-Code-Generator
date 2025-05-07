import React from 'react';
import { Settings2 } from 'lucide-react';
import { QRCodeOptions } from '../types/qrTypes';

interface OptionsPanelProps {
  options: QRCodeOptions;
  onChange: (newOptions: Partial<QRCodeOptions>) => void;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <Settings2 className="h-5 w-5 text-gray-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Customize QR Code</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
            Size: {options.size}px
          </label>
          <input
            id="size"
            type="range"
            min="100"
            max="400"
            step="10"
            value={options.size}
            onChange={(e) => onChange({ size: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>100px</span>
            <span>400px</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="error-correction" className="block text-sm font-medium text-gray-700 mb-1">
            Error Correction
          </label>
          <select
            id="error-correction"
            value={options.level}
            onChange={(e) => onChange({ level: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Higher levels make QR codes more resistant to damage but increase complexity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fg-color" className="block text-sm font-medium text-gray-700 mb-1">
              Foreground Color
            </label>
            <div className="flex">
              <input
                id="fg-color"
                type="color"
                value={options.fgColor}
                onChange={(e) => onChange({ fgColor: e.target.value })}
                className="w-10 h-10 border border-gray-300 rounded-l-md"
              />
              <input
                type="text"
                value={options.fgColor}
                onChange={(e) => onChange({ fgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="bg-color" className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <div className="flex">
              <input
                id="bg-color"
                type="color"
                value={options.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-10 h-10 border border-gray-300 rounded-l-md"
              />
              <input
                type="text"
                value={options.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="include-margin"
            type="checkbox"
            checked={options.includeMargin}
            onChange={(e) => onChange({ includeMargin: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="include-margin" className="ml-2 block text-sm text-gray-700">
            Include margin around QR code
          </label>
        </div>
      </div>
    </div>
  );
};