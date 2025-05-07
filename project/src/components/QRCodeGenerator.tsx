import React, { useState, useCallback } from 'react';
import { URLInput } from './URLInput';
import { QRCodeDisplay } from './QRCodeDisplay';
import { OptionsPanel } from './OptionsPanel';
import { RecentHistory } from './RecentHistory';
import { QRCodeOptions, HistoryItem } from '../types/qrTypes';

export const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [options, setOptions] = useState<QRCodeOptions>({
    size: 200,
    level: 'M',
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    includeMargin: true,
  });
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const handleUrlChange = useCallback((value: string, valid: boolean) => {
    setUrl(value);
    setIsValid(valid);
    setIsGenerated(false);
  }, []);

  const handleOptionsChange = useCallback((newOptions: Partial<QRCodeOptions>) => {
    setOptions(prevOptions => ({ ...prevOptions, ...newOptions }));
  }, []);

  const generateQRCode = useCallback(() => {
    if (!isValid) return;
    
    setIsGenerated(true);
    
    // Add to history if not already present
    if (!history.some(item => item.url === url)) {
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        url,
        options: { ...options },
        createdAt: new Date()
      };
      
      setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 5));
    }
  }, [url, options, isValid, history]);

  const loadFromHistory = useCallback((historyItem: HistoryItem) => {
    setUrl(historyItem.url);
    setOptions(historyItem.options);
    setIsValid(true);
    setIsGenerated(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter URL</h2>
            <URLInput 
              value={url} 
              onChange={handleUrlChange} 
              onGenerate={generateQRCode}
              isValid={isValid}
            />
          </div>
          
          <OptionsPanel 
            options={options} 
            onChange={handleOptionsChange}
          />
          
          <RecentHistory 
            history={history} 
            onSelect={loadFromHistory}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:sticky md:top-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your QR Code</h2>
          <QRCodeDisplay 
            url={url} 
            options={options}
            isGenerated={isGenerated}
            isValid={isValid}
          />
        </div>
      </div>
    </div>
  );
};