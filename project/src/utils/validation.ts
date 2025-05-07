export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    
    const urlObj = new URL(url);
    
    // Check if hostname is valid
    return Boolean(
      urlObj.hostname && 
      urlObj.hostname.includes('.') && 
      urlObj.hostname.length > 3
    );
  } catch (e) {
    return false;
  }
};

export const sanitizeUrl = (url: string): string => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  
  return url;
};