
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdUnit = () => {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        console.log('Attempting to load ad...');
        if (typeof window.adsbygoogle !== 'undefined') {
          console.log('AdSense script loaded, pushing ad');
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } else {
          console.log('AdSense not loaded yet, retrying in 1 second');
          setTimeout(loadAd, 1000);
        }
      } catch (error) {
        console.error('Error loading ad:', error);
      }
    };

    loadAd();
  }, []);

  return (
    <div className="w-full my-4 flex justify-center border-2 border-dashed border-gray-300 bg-gray-50">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '250px' }}
        data-ad-client="ca-pub-9023930540533105"
        data-ad-slot="5837449681"
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
};
