import { useState, useEffect } from 'react';

const useSocialShare = (articleData) => {
  const [isCopied, setIsCopied] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    setIsSupported('share' in navigator || 'clipboard' in navigator);
    
    // Load saved share count
    const savedCount = localStorage.getItem(`share-count-${articleData?.id}`);
    if (savedCount) {
      setShareCount(parseInt(savedCount));
    }
  }, [articleData?.id]);

  const getShareData = () => {
    const url = window.location.href;
    const title = articleData?.title || document.title;
    const text = articleData?.excerpt || `Check out this article on ${document.title}`;
    
    return { url, title, text };
  };

  // Native Web Share API
  const shareViaNative = async () => {
    try {
      const { url, title, text } = getShareData();
      
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
        incrementShareCount();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      const { url } = getShareData();
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      incrementShareCount();
      
      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  };

  // Share to specific platforms
  const shareToPlatform = (platform) => {
    const { url, title, text } = getShareData();
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedText = encodeURIComponent(text);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=HeraldImminence`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${url}`,
    };

    if (platform === 'email') {
      window.location.href = shareUrls.email;
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    
    incrementShareCount();
    return true;
  };

  const incrementShareCount = () => {
    const newCount = shareCount + 1;
    setShareCount(newCount);
    localStorage.setItem(`share-count-${articleData?.id}`, newCount.toString());
    
    // In a real app, you would also send this to your analytics/backend
    console.log('Share count updated:', newCount);
  };

  // Generate share image for platforms that support it
  const generateShareImage = () => {
    // This would generate or retrieve a shareable image
    // For now, return the article's cover image or a default
    return articleData?.coverImage || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop';
  };

  // Get platform-specific share text
  const getPlatformShareText = (platform) => {
    const platformTexts = {
      twitter: 'Share on Twitter',
      facebook: 'Share on Facebook',
      linkedin: 'Share on LinkedIn',
      reddit: 'Share on Reddit',
      whatsapp: 'Share on WhatsApp',
      telegram: 'Share on Telegram',
      email: 'Share via Email',
      copy: 'Copy Link',
      native: 'Share',
    };
    return platformTexts[platform] || 'Share';
  };

  // Get platform icon/color
  const getPlatformStyle = (platform) => {
    const styles = {
      twitter: { bg: 'bg-[#1DA1F2]', hover: 'hover:bg-[#1a8cd8]', icon: '🐦' },
      facebook: { bg: 'bg-[#1877F2]', hover: 'hover:bg-[#166fe5]', icon: '👤' },
      linkedin: { bg: 'bg-[#0A66C2]', hover: 'hover:bg-[#095bb0]', icon: '💼' },
      reddit: { bg: 'bg-[#FF4500]', hover: 'hover:bg-[#e63e00]', icon: '👽' },
      whatsapp: { bg: 'bg-[#25D366]', hover: 'hover:bg-[#22c35e]', icon: '💬' },
      telegram: { bg: 'bg-[#0088cc]', hover: 'hover:bg-[#007ab8]', icon: '📨' },
      email: { bg: 'bg-gray-600', hover: 'hover:bg-gray-700', icon: '✉️' },
      copy: { bg: 'bg-gray-800', hover: 'hover:bg-gray-900', icon: '📋' },
      native: { bg: 'bg-primary', hover: 'hover:bg-primary/90', icon: '📲' },
    };
    return styles[platform] || { bg: 'bg-gray-500', hover: 'hover:bg-gray-600', icon: '🔗' };
  };

  return {
    // State
    isCopied,
    shareCount,
    isSupported,
    
    // Methods
    shareViaNative,
    copyToClipboard,
    shareToPlatform,
    
    // Utils
    getPlatformShareText,
    getPlatformStyle,
    generateShareImage,
    getShareData,
  };
};

export default useSocialShare;
