import React from 'react';
import { QrCode } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <QrCode className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">QR Code Generator</h1>
      </div>
    </header>
  );
};