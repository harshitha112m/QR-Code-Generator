import React, { useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { QRCodeOptions } from '../types/qrTypes';
import { Download, Share2 } from 'lucide-react';

interface QRCodeDisplayProps {
  url: string;
  options: QRCodeOptions;
  isGenerated: boolean;
  isValid: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  url,
  options,
  isGenerated,
  isValid,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'jpeg'>('png');
  const [copied, setCopied] = useState(false);

  const downloadQRCode = () => {
    if (!qrRef.current || !isGenerated) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    // Convert canvas to data URL based on selected format
    const mime = downloadFormat === 'jpeg' ? 'image/jpeg' : 
                downloadFormat === 'png' ? 'image/png' : 'image/svg+xml';
    
    const dataUrl = canvas.toDataURL(mime, 1.0);
    
    // Create download link
    const link = document.createElement('a');
    const filename = `qrcode-${new Date().getTime()}.${downloadFormat}`;
    
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!qrRef.current || !isGenerated) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png', 1.0);
      });
      
      // Create clipboard item
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      
      // Show success message
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isGenerated && isValid ? (
        <>
          <div 
            ref={qrRef}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300"
            style={{ 
              backgroundColor: options.bgColor,
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          >
            <QRCode
              value={url}
              size={options.size}
              bgColor={options.bgColor}
              fgColor={options.fgColor}
              level={options.level}
              includeMargin={options.includeMargin}
            />
          </div>
          
          <div className="mt-6 w-full">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <div className="flex-1">
                <label htmlFor="format-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  id="format-select"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value as any)}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="svg">SVG</option>
                </select>
              </div>
              
              <button
                onClick={downloadQRCode}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 shadow-sm"
              >
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>
            
            <button
              onClick={copyToClipboard}
              className={`w-full mt-3 flex items-center justify-center gap-2 ${
                copied ? 'bg-green-600' : 'bg-purple-600 hover:bg-purple-700'
              } text-white py-2 px-4 rounded-md transition duration-200 shadow-sm`}
            >
              <Share2 size={18} />
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center p-6">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <QRCode
              value="QR Code Preview"
              size={100}
              bgColor="#f3f4f6"
              fgColor="#d1d5db"
              level="L"
              includeMargin={true}
            />
          </div>
          <p className="text-gray-500 mt-4">
            {!url ? 'Enter a URL to generate a QR code' : 
              !isValid ? 'Please enter a valid URL' : 
                'Click "Generate QR Code" to create your QR code'}
          </p>
        </div>
      )}
    </div>
  );
};