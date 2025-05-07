import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} QR Code Generator
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
              <Github className="h-5 w-5 mr-2" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};