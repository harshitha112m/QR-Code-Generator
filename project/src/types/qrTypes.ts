export interface QRCodeOptions {
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
  bgColor: string;
  fgColor: string;
  includeMargin: boolean;
}

export interface HistoryItem {
  id: string;
  url: string;
  options: QRCodeOptions;
  createdAt: Date;
}