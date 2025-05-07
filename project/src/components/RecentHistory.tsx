import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { HistoryItem } from '../types/qrTypes';

interface RecentHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-gray-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Recent QR Codes</h2>
      </div>
      
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item.id} className="group">
            <button
              onClick={() => onSelect(item)}
              className="w-full text-left p-3 flex items-center justify-between rounded-md hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center overflow-hidden">
                <div 
                  className="w-8 h-8 bg-gray-100 rounded-md mr-3 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: item.options.bgColor }}
                >
                  <span className="text-xs" style={{ color: item.options.fgColor }}>QR</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.url}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <ExternalLink 
                className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-150" 
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};