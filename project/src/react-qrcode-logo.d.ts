declare module 'react-qrcode-logo' {
  import React from 'react';

  interface QRCodeProps {
    value: string;
    ecLevel?: 'L' | 'M' | 'Q' | 'H';
    size?: number;
    quietZone?: number;
    bgColor?: string;
    fgColor?: string;
    logoImage?: string;
    logoWidth?: number;
    logoHeight?: number;
    logoOpacity?: number;
    logoOnLoad?: () => void;
    removeQrCodeBehindLogo?: boolean;
    logoPadding?: number;
    logoPaddingStyle?: 'square' | 'circle';
    eyeRadius?: number | number[];
    eyeColor?: string;
    qrStyle?: 'squares' | 'dots';
    style?: object;
    includeMargin?: boolean;
    id?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
  }

  export class QRCode extends React.Component<QRCodeProps> {}
}